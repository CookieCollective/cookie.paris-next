import { Link } from 'gatsby';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import MasonryInfiniteScroller from 'react-masonry-infinite';
import { Icon } from 'semantic-ui-react';
import { ContentTypeIcon } from './content';
import styles from './grid.module.scss';

export const query = graphql`
	fragment GridNode on Mdx {
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
`;

export interface GridNode {
	excerpt: string;
	fields: {
		contentType: string;
		slug: string;
	};
	frontmatter: {
		date: string;
		endDate?: string;
		thumbnail?: {
			childImageSharp: {
				fixed: any;
			};
		};
		title: string;
	};
	id: string;
}

interface Props {
	nodes: GridNode[];
}

export const Grid: React.FunctionComponent<Props> = ({ nodes }) => (
	<MasonryInfiniteScroller
		className={styles.grid}
		hasMore={false}
		loadMore={() => {
			// TODO
		}}
	>
		{nodes.map((node) => {
			const date = node.frontmatter.endDate ? (
				<div className={styles.date}>
					{node.frontmatter.date} <Icon name="caret right" />
					{node.frontmatter.endDate}
				</div>
			) : (
				<div className={styles.date}>{node.frontmatter.date}</div>
			);

			const thumbnail = node.frontmatter.thumbnail ? (
				<Img
					className={styles.thumbnail}
					fixed={node.frontmatter.thumbnail.childImageSharp.fixed}
				/>
			) : null;

			return (
				<div className={styles.item} key={node.id}>
					<Link className={styles.link} to={node.fields.slug}>
						<div className={styles.contentType}>
							<ContentTypeIcon
								contentType={node.fields.contentType}
							></ContentTypeIcon>
						</div>
						{date}
						{thumbnail}
						<div className={styles.title}>{node.frontmatter.title}</div>
						<div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
					</Link>
				</div>
			);
		})}
	</MasonryInfiniteScroller>
);
