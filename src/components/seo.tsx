import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

export const SEO: React.FunctionComponent = ({ children }) => (
	<StaticQuery
		query={graphql`
			{
				site {
					siteMetadata {
						description
						image
						siteUrl
						title
					}
				}
			}
		`}
		render={({ site: { siteMetadata: seo } }) => (
			<Helmet>
				<title>{seo.title}</title>
			</Helmet>
		)}
	></StaticQuery>
);
