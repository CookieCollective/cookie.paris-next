const path = require('path');

const contentsPath = path.join(__dirname, 'src', 'contents');

module.exports = {
	plugins: [
		'gatsby-plugin-typescript',
		'gatsby-plugin-scss-typescript',
		'gatsby-plugin-less',
		'gatsby-plugin-react-helmet',
		{
			options: {
				name: 'demoparty-reports',
				path: path.join(contentsPath, 'demoparty-reports'),
			},
			resolve: 'gatsby-source-filesystem',
		},
		{
			options: {
				name: 'events',
				path: path.join(contentsPath, 'events'),
			},
			resolve: 'gatsby-source-filesystem',
		},
		{
			options: {
				name: 'fanzines',
				path: path.join(contentsPath, 'fanzines'),
			},
			resolve: 'gatsby-source-filesystem',
		},
		{
			options: {
				name: 'news',
				path: path.join(contentsPath, 'news'),
			},
			resolve: 'gatsby-source-filesystem',
		},
		{
			options: {
				name: 'photos',
				path: path.join(contentsPath, 'photos'),
			},
			resolve: 'gatsby-source-filesystem',
		},
		{
			options: {
				name: 'projects',
				path: path.join(contentsPath, 'projects'),
			},
			resolve: 'gatsby-source-filesystem',
		},
		{
			options: {
				name: 'static',
				path: path.join(contentsPath, 'static'),
			},
			resolve: 'gatsby-source-filesystem',
		},
		'gatsby-plugin-catch-links',
		{
			options: {
				defaultQuality: 75,
				stripMetadata: true,
				useMozJpeg: false,
			},
			resolve: 'gatsby-plugin-sharp',
		},
		'gatsby-transformer-sharp',
		'gatsby-remark-images',
		{
			options: {
				extensions: ['.md', '.mdx'],
				gatsbyRemarkPlugins: [
					{
						options: {
							maxWidth: 1200,
						},
						resolve: 'gatsby-remark-images',
					},
					{
						options: {
							destinationDir: 'static',
						},
						resolve: 'gatsby-remark-copy-linked-files',
					},
					'gatsby-remark-autolink-headers',
				],
				plugins: [
					'gatsby-remark-autolink-headers',
					'gatsby-remark-copy-linked-files',
					'gatsby-remark-images',
				],
			},
			resolve: 'gatsby-plugin-mdx',
		},
		{
			options: {
				endpoint:
					'https://paris.us20.list-manage.com/subscribe/post?u=03cf7a7a664ca837b7c800603&amp;id=68d32fe2b3',
			},
			resolve: 'gatsby-plugin-mailchimp',
		},
	],
	siteMetadata: {
		description: 'foobar',
		image: 'https://lengstorf.com/images/jason-lengstorf.jpg',
		siteUrl: 'https://cookie.paris',
		title: 'Cookie Collective',
	},
};
