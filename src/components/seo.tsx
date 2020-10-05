import { graphql, useStaticQuery } from 'gatsby';
import { GatsbySeo, GatsbySeoProps } from 'gatsby-plugin-next-seo';
import React from 'react';

interface Props extends GatsbySeoProps {
	slug: string;
}

export const Seo: React.FunctionComponent<Props> = (props) => {
	const sideData = useStaticQuery<{
		site: {
			siteMetadata: {
				url: string;
			};
		};
	}>(graphql`
		query {
			site {
				siteMetadata {
					url
				}
			}
		}
	`);

	const canonical = sideData.site.siteMetadata.url + props.slug;

	const openGraph = props.openGraph || {};

	if (openGraph.images) {
		openGraph.images.forEach((image) => {
			image.url = sideData.site.siteMetadata.url + image.url;
		});
	}

	openGraph.title = props.title;

	openGraph.url = canonical;

	return <GatsbySeo openGraph={openGraph} canonical={canonical} {...props} />;
};
