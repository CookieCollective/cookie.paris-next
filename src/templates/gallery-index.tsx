import { graphql } from 'gatsby';
import React from 'react';
import { PostLayout, PostNode } from '../components/post-layout';
import { DefaultScreenLayout } from '../components/screen-layout';

export const query = graphql`
	query($slug: String!) {
		node: mdx(fields: { slug: { eq: $slug } }) {
			...PostNode
		}
	}
`;

interface Props {
	data: {
		node: PostNode;
	};
}

export const Event: React.FunctionComponent<Props> = ({ data: { node } }) => {
	return (
		<DefaultScreenLayout>
			<PostLayout node={node} />
		</DefaultScreenLayout>
	);
};

export default Event;
