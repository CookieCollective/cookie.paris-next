import { graphql } from 'gatsby';
import React from 'react';
import { GridNode, MasonryLayout } from '../components/masonry-layout';

export const query = graphql`
	query {
		allMdx(
			filter: { fields: { collection: { eq: "events" }, post: { eq: true } } }
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

export const Events: React.FunctionComponent<Props> = ({ data }) =>
	data ? <MasonryLayout nodes={data.allMdx.nodes} slug="/events/" /> : null;

export default Events;