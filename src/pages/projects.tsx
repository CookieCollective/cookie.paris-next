import { graphql } from 'gatsby';
import React from 'react';
import { GridNode, MasonryLayout } from '../components/masonry-layout';

export const query = graphql`
	query {
		allMdx(
			filter: { fields: { collection: { eq: "projects" } } }
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

export const Projects: React.FunctionComponent<Props> = ({ data }) =>
	data ? <MasonryLayout nodes={data.allMdx.nodes} slug="/projects/" /> : null;

export default Projects;
