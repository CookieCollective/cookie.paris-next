const path = require('path');

const siteMetadata = {
	description:
		'Cookie Collective gathers digital artists involved in real-time creation. This covers video games, art installations, video mapping, demoscene, live coding, etc.',
	image: 'https://lengstorf.com/images/jason-lengstorf.jpg',
	title: 'Cookie Collective',
	url: 'https://cookie.paris',
};

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
		{
			options: {
				language: 'en',
				openGraph: {
					description: siteMetadata.description,
					site_name: siteMetadata.title,
					type: 'website',
					url: siteMetadata.url,
				},
				titleTemplate: `%s | ${siteMetadata.title}`,
				twitter: {
					cardType: 'summary',
					site: '@CookieDemoparty',
				},
			},
			resolve: 'gatsby-plugin-next-seo',
		},
	],
	siteMetadata,
};
