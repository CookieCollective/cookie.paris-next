import { graphql } from 'gatsby';
import React from 'react';
import { ArticleLayout, MdxArticleData } from './article-layout';
import { BodyRenderer } from './body-renderer';

export const query = graphql`
	fragment MdxDefaultContentData on Mdx {
		...MdxArticleData
		body
		excerpt
		frontmatter {
			width
		}
	}
`;

export type MdxDefaultContentData = MdxArticleData & {
	body: string;
	excerpt: string;
	frontmatter: {
		width?: string;
	};
};

interface Props {
	node: MdxDefaultContentData;
	slug: string;
}

const WIDTHS: { [width: string]: string } = {
	wide: '1200px',
};

export const DefaultContentLayout: React.FunctionComponent<Props> = (props) => (
	<ArticleLayout
		description={props.node.excerpt}
		style={{
			maxWidth:
				props.node.frontmatter.width && WIDTHS[props.node.frontmatter.width],
		}}
		{...props}
	>
		<BodyRenderer>{props.node.body}</BodyRenderer>
	</ArticleLayout>
);
