const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');

const SOURCE_INSTANCE_NAME_TO_CONTENT_TYPE_MAPPING = {
	events: 'event',
	fanzines: 'fanzine',
	galleries: 'gallery',
	posts: 'post',
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

		const contentType =
			SOURCE_INSTANCE_NAME_TO_CONTENT_TYPE_MAPPING[sourceInstanceName];
		if (!contentType) {
			console.log(JSON.stringify(internal));
			throw new Error(
				`No mapping from "${sourceInstanceName}" source instance name to content type, required by: ${internal.description}`
			);
		}

		createNodeField({
			name: 'contentType',
			node,
			value: contentType,
		});

		const relativeFilePath = createFilePath({
			getNode,
			node,
		});

		createNodeField({
			name: 'slug',
			node,
			value: `/posts${relativeFilePath}`,
		});
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
						contentType
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
				component: path.join(
					templatesPath,
					`${node.fields.contentType}-index.tsx`
				),
				context: {
					slug: node.fields.slug,
				},
				path: node.fields.slug,
			});

			switch (node.fields.contentType) {
				case 'fanzine':
					await createFanzineOnlinePages({
						allImageSharp,
						createPage,
						graphql,
						node,
					});
					break;
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
		component: path.join(
			templatesPath,
			`${node.fields.contentType}-online.tsx`
		),
		context: {
			pages,
			slug: node.fields.slug,
		},
		path: node.fields.slug + 'online/',
	});
}

exports.onCreateWebpackConfig = ({ actions }) => {
	actions.setWebpackConfig({
		resolve: {
			alias: {
				'../../theme.config$': path.resolve(
					__dirname,
					'src',
					'semantic',
					'theme.config'
				),
			},
		},
	});
};
