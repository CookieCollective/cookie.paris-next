const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const SOURCE_INSTANCE_NAME_TO_SOURCE_PROPERTIES_MAPPINGS = {
	['demoparty-reports']: {
		collection: 'news',
		isPost: true,
		template: 'demoparty-report',
	},
	events: {
		collection: 'events',
		isPost: true,
	},
	fanzines: {
		collection: 'projects',
		isPost: true,
		template: 'fanzine',
	},
	news: {
		collection: 'news',
		isPost: true,
	},
	photos: {
		collection: 'photos',
		isPost: true,
	},
	projects: {
		collection: 'projects',
		isPost: true,
	},
	static: {
		isPost: false,
	},
};

exports.onCreateNode = async ({
	node,
	getNode,
	actions: { createNodeField },
}) => {
	if (node.internal.type === 'Mdx') {
		const { internal, name, sourceInstanceName } = getNode(node.parent);

		if (name !== 'index') {
			throw new Error(
				`MDX node should base on a file named index: ${internal.description}`
			);
		}

		const sourceProperty =
			SOURCE_INSTANCE_NAME_TO_SOURCE_PROPERTIES_MAPPINGS[sourceInstanceName];
		if (!sourceProperty) {
			console.log(JSON.stringify(internal));
			throw new Error(`Source "${sourceInstanceName}" has no properties`);
		}

		createNodeField({
			name: 'isPost',
			node,
			value: sourceProperty.isPost,
		});

		createNodeField({
			name: 'template',
			node,
			value: sourceProperty.template || 'default-content',
		});

		if (sourceProperty.collection) {
			createNodeField({
				name: 'collection',
				node,
				value: sourceProperty.collection,
			});
		}

		const relativeFilePath = createFilePath({
			getNode,
			node,
		});

		createNodeField({
			name: 'guid',
			node,
			value: relativeFilePath,
		});

		if (sourceInstanceName === 'static') {
			createNodeField({
				name: 'slug',
				node,
				value: relativeFilePath,
			});
		} else {
			createNodeField({
				name: 'slug',
				node,
				value: `/posts${relativeFilePath}`,
			});
		}
	}
};

const templatesPath = path.resolve(__dirname, 'src', 'templates');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
	const {
		data: { allImageSharp },
	} = await graphql(`
		query {
			allImageSharp {
				nodes {
					id
					parent {
						... on File {
							relativePath
							sourceInstanceName
						}
					}
				}
			}
		}
	`);

	const {
		data: { allMdx },
	} = await graphql(`
		query {
			allMdx {
				nodes {
					fields {
						template
						slug
					}
					id
				}
			}
		}
	`);

	await Promise.all(
		allMdx.nodes.map(async (node) => {
			createPage({
				component: path.join(templatesPath, `${node.fields.template}.tsx`),
				context: {
					slug: node.fields.slug,
				},
				path: node.fields.slug,
			});

			if (node.fields.template === 'fanzine') {
				await createFanzineOnlinePages({
					allImageSharp,
					createPage,
					graphql,
					node,
				});
			}
		})
	);
};

async function createFanzineOnlinePages({
	allImageSharp,
	createPage,
	graphql,
	node,
}) {
	const {
		data: { mdx },
	} = await graphql(
		`
			query($id: String!) {
				mdx(id: { eq: $id }) {
					frontmatter {
						pages {
							image
							link
						}
					}
					parent {
						... on File {
							relativeDirectory
							sourceInstanceName
						}
					}
				}
			}
		`,
		{
			id: node.id,
		}
	);

	const { relativeDirectory, sourceInstanceName } = mdx.parent;
	const sourceImageSharpNodes = allImageSharp.nodes.filter(
		(node) => node.parent.sourceInstanceName === sourceInstanceName
	);

	const pages = mdx.frontmatter.pages
		? await Promise.all(
				mdx.frontmatter.pages.map(async (page) => {
					const relativePath = `${relativeDirectory}/pages/${page.image}`;

					const targetImageSharpNodes = sourceImageSharpNodes.filter(
						(node) => node.parent.relativePath === relativePath
					);

					if (targetImageSharpNodes.length !== 1) {
						throw new Error(
							`Failed to find unique ImageSharp node corresponding to "${relativePath}"`
						);
					}

					const {
						data: { imageSharp },
					} = await graphql(
						`
							query($id: String!, $srcSetBreakpoints: [Int!]!) {
								imageSharp(id: { eq: $id }) {
									fixed(width: 20, toFormat: JPG) {
										base64
									}
									fluid(srcSetBreakpoints: $srcSetBreakpoints, toFormat: JPG) {
										srcSet
									}
									original {
										height
										src
										width
									}
								}
							}
						`,
						{
							id: targetImageSharpNodes[0].id,
							srcSetBreakpoints: [384, 960],
						}
					);

					return {
						...imageSharp,
						...page,
					};
				})
		  )
		: [];

	createPage({
		component: path.join(templatesPath, `fanzine-online.tsx`),
		context: {
			collection: node.fields.collection,
			pages,
			slug: node.fields.slug,
		},
		path: node.fields.slug + 'online/',
	});
}
