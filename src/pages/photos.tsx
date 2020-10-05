import { graphql } from 'gatsby';
import React from 'react';
import { GridNode, MasonryLayout } from '../components/masonry-layout';

export const query = graphql`
	query {
		allMdx(
			filter: { fields: { collection: { eq: "photos" } } }
			sort: { fields: frontmatter___date, order: DESC }
		) {
			nodes {
				...GridNode
			}
		}
	}
`;

interface Props {
	data?: {
		allMdx: {
			nodes: GridNode[];
		};
	};
}

export const Photos: React.FunctionComponent<Props> = ({ data }) => (
	<MasonryLayout
		nodes={data && data.allMdx.nodes}
		slug="/photos/"
		title="Photos"
	/>
);

export default Photos;
