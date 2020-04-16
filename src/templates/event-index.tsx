import { graphql } from 'gatsby';
import React from 'react';
import {
	ContentNode,
	DefaultContentLayout,
} from '../components/default-content-layout';

export const query = graphql`
	query($slug: String!) {
		node: mdx(fields: { slug: { eq: $slug } }) {
			...PostNode
		}
	}
`;

interface Props {
	data: {
		node: ContentNode;
	};
	pageContext: {
		slug: string;
	};
}

export const Event: React.FunctionComponent<Props> = ({
	data: { node },
	pageContext: { slug },
}) => <DefaultContentLayout node={node} slug={slug} />;

export default Event;
