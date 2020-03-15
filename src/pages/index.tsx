import { graphql } from 'gatsby';
import React from 'react';
import { Grid, GridNode } from '../components/grid';
import { DefaultScreenLayout } from '../components/screen-layout';

export const query = graphql`
	query {
		allMdx(
			filter: { fields: { view: { eq: "index" } } }
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

export const Index: React.FunctionComponent<Props> = ({ data }) => {
	return data ? (
		<DefaultScreenLayout>
			<Grid nodes={data.allMdx.nodes}></Grid>
		</DefaultScreenLayout>
	) : (
		<div>Nothing</div>
	);
};

export default Index;
