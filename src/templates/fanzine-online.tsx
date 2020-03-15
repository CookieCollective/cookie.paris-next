import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { FullScreenLayout } from '../components/screen-layout';

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

interface Props {
	data: {
		node: {
			body: string;
			frontmatter: {
				title: string;
			};
		};
	};
}

export const Event: React.FunctionComponent<Props> = ({ data: { node } }) => {
	return (
		<FullScreenLayout>
			<MDXRenderer>{node.body}</MDXRenderer>
		</FullScreenLayout>
	);
};

export default Event;
