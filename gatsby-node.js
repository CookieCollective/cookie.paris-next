const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
	if (node.internal.type === /*'MarkdownRemark'*/ 'Mdx') {
		const { sourceInstanceName } = getNode(node.parent);

		switch (sourceInstanceName) {
			case 'events': {
				const relativeFilePath = createFilePath({
					basePath: 'events',
					getNode,
					node,
				});

				createNodeField({
					name: 'contentType',
					node,
					value: 'event',
				});

				createNodeField({
					name: 'slug',
					node,
					value: `/events${relativeFilePath}`,
				});

				break;
			}

			case 'posts': {
				const relativeFilePath = createFilePath({
					basePath: 'posts',
					getNode,
					node,
				});

				createNodeField({
					name: 'contentType',
					node,
					value: 'post',
				});

				createNodeField({
					name: 'slug',
					node,
					value: `/posts${relativeFilePath}`,
				});

				break;
			}

			default:
				throw new Error('Unknown source.');
		}
	}
};
/*
exports.createPages = async ({ graphql, actions: { createPage } }) => {
	const { data } = await graphql(`
		query {
			allMarkdownRemark {
				nodes {
					fields {
						contentType
						slug
					}
				}
			}
		}
	`);

	data.allMarkdownRemark.nodes.forEach((node) => {
		switch (node.fields.contentType) {
			case 'event':
				createPage({
					component: path.resolve(__dirname, 'src', 'templates', 'event.tsx'),
					context: {
						slug: node.fields.slug,
					},
					path: node.fields.slug,
				});
				break;

			case 'post':
				createPage({
					component: path.resolve(__dirname, 'src', 'templates', 'post.tsx'),
					context: {
						slug: node.fields.slug,
					},
					path: node.fields.slug,
				});
				break;

			default:
				throw new Error('Unknown source.');
		}
	});
};
*/
exports.createPages = async ({ graphql, actions: { createPage } }) => {
	const { data } = await graphql(`
		query {
			allMdx {
				nodes {
					fields {
						contentType
						slug
					}
				}
			}
		}
	`);

	data.allMdx.nodes.forEach((node) => {
		switch (node.fields.contentType) {
			case 'event':
				createPage({
					component: path.resolve(__dirname, 'src', 'templates', 'event.tsx'),
					context: {
						slug: node.fields.slug,
					},
					path: node.fields.slug,
				});
				break;

			case 'post':
				createPage({
					component: path.resolve(__dirname, 'src', 'templates', 'post.tsx'),
					context: {
						slug: node.fields.slug,
					},
					path: node.fields.slug,
				});
				break;

			default:
				throw new Error('Unknown source.');
		}
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
