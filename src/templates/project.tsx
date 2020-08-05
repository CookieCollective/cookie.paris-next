import { graphql, Link } from 'gatsby';
import React from 'react';
import { ArticleLayout } from '../components/article-layout';
import { BodyRenderer } from '../components/body-renderer';
import { ContentNode } from '../components/default-content-layout';

export const query = graphql`
	query($slug: String!) {
		node: mdx(fields: { slug: { eq: $slug } }) {
			fields {
				slug
			}
			...PostNode
		}
	}
`;

interface Props {
	data: {
		node: ContentNode & {
			fields: {
				slug: string;
			};
		};
	};
	pageContext: {
		slug: string;
	};
}

export const Project: React.FunctionComponent<Props> = ({
	data: { node },
	pageContext: { slug },
}) => {
	return (
		<ArticleLayout slug={slug} {...node.frontmatter}>
			<BodyRenderer>{node.body}</BodyRenderer>
		</ArticleLayout>
	);
};

export default Project;
