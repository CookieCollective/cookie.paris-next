import { graphql } from 'gatsby';
import React from 'react';
import { Grid, GridNode } from '../components/grid';
import { DefaultScreenLayout } from '../components/screen-layout';

export const query = graphql`
	query {
		allMdx(
			filter: { fields: { contentType: { eq: "gallery" } } }
			sort: { fields: frontmatter___date, order: DESC }
		) {
			nodes {
				...GridNode
			}
		}
	}
`;

interface Props {
	data: {
		allMdx: {
			nodes: GridNode[];
		};
	};
}

export const Galleries: React.FunctionComponent<Props> = ({ data }) => {
	return (
		<DefaultScreenLayout>
			<Grid nodes={data.allMdx.nodes}></Grid>
		</DefaultScreenLayout>
	);
};

export default Galleries;
