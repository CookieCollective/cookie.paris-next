import { graphql } from 'gatsby';
import React from 'react';
import { Grid, IGridNode } from '../components/grid';
import { Layout } from '../components/layout';

interface IProps {
	data: {
		allMdx: {
			nodes: IGridNode[];
		};
	};
}

export const Events: React.FunctionComponent<IProps> = ({ data }) => {
	return (
		<Layout>
			<Grid nodes={data.allMdx.nodes}></Grid>
		</Layout>
	);
};

export const query = graphql`
	query {
		allMdx(
			sort: { fields: frontmatter___date, order: DESC }
			filter: { fields: { contentType: { eq: "event" } } }
		) {
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

export default Events;
