import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { Layout } from '../components/layout';
import { Text } from '../components/text';

interface IProps {
	data: {
		node: {
			body: string;
			frontmatter: {
				date: string;
				endDate?: string;
				thumbnail?: {
					childImageSharp: {
						fixed: any;
					};
				};
				title: string;
			};
		};
	};
}

export const Event: React.FunctionComponent<IProps> = ({ data: { node } }) => {
	const thumbnail = node.frontmatter.thumbnail ? (
		<Img fixed={node.frontmatter.thumbnail.childImageSharp.fixed} />
	) : null;

	return (
		<Layout>
			<Text title={node.frontmatter.title}>
				{thumbnail}
				<MDXRenderer>{node.body}</MDXRenderer>
			</Text>
		</Layout>
	);
};

export const query = graphql`
	query($slug: String!) {
		node: mdx(fields: { slug: { eq: $slug } }) {
			body
			frontmatter {
				date(formatString: "LL")
				endDate(formatString: "LL")
				thumbnail {
					childImageSharp {
						fixed(width: 728) {
							...GatsbyImageSharpFixed
						}
					}
				}
				title
			}
		}
	}
`;

export default Event;
