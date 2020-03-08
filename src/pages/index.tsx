import { graphql } from 'gatsby';
import React from 'react';
import { Grid, IGridNode } from '../components/grid';
import { Layout } from '../components/layout';

interface IProps {
	data?: {
		allMdx: {
			nodes: IGridNode[];
		};
	};
}

export const Index: React.FunctionComponent<IProps> = ({ data }) => {
	return data ? (
		<Layout>
			<Grid nodes={data.allMdx.nodes}></Grid>
		</Layout>
	) : (
		<div>Nothing</div>
	);
};

export const query = graphql`
	query {
		allMdx(sort: { fields: frontmatter___date, order: DESC }) {
			nodes {
				excerpt
				fields {
					contentType
					slug
				}
				frontmatter {
					date(formatString: "ll")
					endDate(formatString: "ll")
					thumbnail {
						childImageSharp {
							fixed(width: 280) {
								...GatsbyImageSharpFixed
							}
						}
					}
					title
				}
				id
			}
		}
	}
`;

export default Index;
