import { graphql } from 'gatsby';
import { FluidObject, FixedObject } from 'gatsby-image';
import React from 'react';
import { ArticleLayout } from './article-layout';
import { BodyRenderer } from './body-renderer';

export const query = graphql`
	fragment PostNode on Mdx {
		body
		frontmatter {
			author
			cover {
				childImageSharp {
					fluid(jpegQuality: 90, toFormat: JPG, srcSetBreakpoints: [400, 760]) {
						...GatsbyImageSharpFluid
					}
					original {
						height
						src
						width
					}
				}
			}
			date(formatString: "LL")
			endDate(formatString: "LL")
			links {
				name
				url
			}
			subtitle
			title
			width
			year: date(formatString: "YYYY")
		}
	}
`;

export interface ContentNode {
	body: string;
	frontmatter: {
		author?: string;
		cover?: {
			childImageSharp: {
				fluid: FluidObject;
				original: {
					height: number;
					src: string;
					width: number;
				};
			};
		};
		date: string;
		endDate?: string;
		links?: {
			name: string;
			url: string;
		}[];
		subtitle?: string;
		title: string;
		width?: string;
		year: string;
	};
}

interface Props {
	node: ContentNode;
	slug: string;
}

const WIDTHS: { [width: string]: string } = {
	wide: '1200px',
};

export const DefaultContentLayout: React.FunctionComponent<Props> = ({
	node,
	slug,
}) => (
	<ArticleLayout
		slug={slug}
		style={{
			maxWidth: node.frontmatter.width && WIDTHS[node.frontmatter.width],
		}}
		{...node.frontmatter}
	>
		<BodyRenderer>{node.body}</BodyRenderer>
	</ArticleLayout>
);
