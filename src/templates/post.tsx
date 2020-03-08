import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { Layout } from '../components/layout';
import { Text } from '../components/text';

interface IProps {
	data: {
		node?: {
			body: string;
			frontmatter: {
				title: string;
			};
		};
	};
}

export const Post: React.FunctionComponent<IProps> = ({ data: { node } }) => {
	return node ? (
		<Layout>
			<Text title={node.frontmatter.title}>
				<MDXRenderer>{node.body}</MDXRenderer>
			</Text>
		</Layout>
	) : (
		<div>Nothing.</div>
	);
};

export const query = graphql`
	query($slug: String!) {
		node: mdx(fields: { slug: { eq: $slug } }) {
			body
			frontmatter {
				title
			}
		}
	}
`;

export default Post;
