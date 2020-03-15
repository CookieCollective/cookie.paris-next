const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');

const SOURCE_INSTANCE_NAME_TO_CONTENT_TYPE_MAPPING = {
	events: 'event',
	fanzines: 'fanzine',
	galleries: 'gallery',
	posts: 'post',
};

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
	if (node.internal.type === 'Mdx') {
		const { internal, name, sourceInstanceName } = getNode(node.parent);

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

		createNodeField({
			name: 'view',
			node,
			value: name,
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
	const { data } = await graphql(`
		query {
			allMdx {
				nodes {
					fields {
						contentType
						slug
						view
					}
				}
			}
		}
	`);

	data.allMdx.nodes.forEach((node) => {
		createPage({
			component: path.join(
				templatesPath,
				`${node.fields.contentType}-${node.fields.view}.tsx`
			),
			context: {
				slug: node.fields.slug,
			},
			path: node.fields.slug,
		});
		/*
		switch (node.fields.contentType) {
			case 'fanzine':
				createPage({
					component: path.join(templatesPath, 'fanzine-online.tsx'),
					context: {
						slug: node.fields.slug,
					},
					path: node.fields.slug + 'online',
				});
				break;
		}*/
	});
};

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
