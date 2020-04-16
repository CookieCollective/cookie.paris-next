import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import React from 'react';
import { ArticleLayout } from './article-layout';
import { BodyRenderer } from './body-renderer';

export const query = graphql`
	fragment PostNode on Mdx {
		body
		frontmatter {
			date(formatString: "LL")
			endDate(formatString: "LL")
			thumbnail {
				childImageSharp {
					fluid(fit: CONTAIN, maxHeight: 400, srcSetBreakpoints: [400, 800]) {
						...GatsbyImageSharpFluid
					}
					original {
						height
						width
					}
				}
			}
			title
			width
		}
	}
`;

export interface ContentNode {
	body: string;
	frontmatter: {
		date: string;
		endDate?: string;
		thumbnail?: {
			childImageSharp: {
				fluid: FluidObject;
				original: {
					height: number;
					width: number;
				};
			};
		};
		title: string;
		width?: string;
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
		date={node.frontmatter.date}
		endDate={node.frontmatter.endDate}
		slug={slug}
		style={{
			maxWidth: node.frontmatter.width && WIDTHS[node.frontmatter.width],
		}}
		thumbnail={node.frontmatter.thumbnail}
		title={node.frontmatter.title}
	>
		<BodyRenderer>{node.body}</BodyRenderer>
	</ArticleLayout>
);
