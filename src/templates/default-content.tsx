import { graphql } from 'gatsby';
import React from 'react';
import {
	DefaultContentLayout,
	MdxDefaultContentData,
} from '../components/default-content-layout';

export const query = graphql`
	query($slug: String!) {
		node: mdx(fields: { slug: { eq: $slug } }) {
			...MdxDefaultContentData
		}
	}
`;

interface Props {
	data: {
		node: MdxDefaultContentData;
	};
	pageContext: {
		slug: string;
	};
}

export const DefaultContent: React.FunctionComponent<Props> = ({
	data: { node },
	pageContext: { slug },
}) => <DefaultContentLayout node={node} slug={slug} />;

export default DefaultContent;
