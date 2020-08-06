const path = require('path');

const contentsPath = path.join(__dirname, 'src', 'contents');

const sourceFilesystem = (name) => ({
	options: {
		name,
		path: path.join(contentsPath, name),
	},
	resolve: 'gatsby-source-filesystem',
});

module.exports = {
	plugins: [
		'gatsby-plugin-typescript',
		'gatsby-plugin-scss-typescript',
		'gatsby-plugin-less',
		'gatsby-plugin-react-helmet',
		sourceFilesystem('demoparty-reports'),
		sourceFilesystem('events'),
		sourceFilesystem('fanzines'),
		sourceFilesystem('news'),
		sourceFilesystem('photos'),
		sourceFilesystem('projects'),
		sourceFilesystem('static'),
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
