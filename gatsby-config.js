const path = require('path');

module.exports = {
	plugins: [
		'gatsby-plugin-typescript',
		'gatsby-plugin-scss-typescript',
		'gatsby-plugin-less',
		'gatsby-plugin-react-helmet',
		{
			options: {
				name: 'events',
				path: path.join(__dirname, 'src', 'events'),
			},
			resolve: 'gatsby-source-filesystem',
		},
		{
			options: {
				name: 'posts',
				path: path.join(__dirname, 'src', 'posts'),
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
				plugins: [
					{
						options: {
							maxWidth: 960,
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
			},
			resolve: 'gatsby-transformer-remark',
		},
		{
			options: {
				extensions: ['.md', '.mdx'],
				gatsbyRemarkPlugins: [
					{
						options: {
							maxWidth: 960,
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
