import { Link } from 'gatsby';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import MasonryInfiniteScroller, { Size } from 'react-masonry-infinite';
import styles from './masonry-layout.module.scss';
import { PageLayout } from './page-layout';

const GUTTER = 20;

const SIZES: Size[] = [];
for (let i = 1; i < 6; ++i) {
	SIZES.push({
		columns: i,
		gutter: GUTTER,
		mq: i > 1 ? i * (280 + GUTTER) + GUTTER + 'px' : undefined,
	});
}
export const query = graphql`
	fragment GridNode on Mdx {
		excerpt
		fields {
			slug
		}
		frontmatter {
			author
			date(formatString: "ll")
			endDate(formatString: "ll")
			subtitle
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
		slug: string;
	};
	frontmatter: {
		author?: string;
		date: string;
		endDate?: string;
		subtitle?: string;
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
	slug: string;
}

export const MasonryLayout: React.FunctionComponent<Props> = ({
	nodes,
	slug,
}) => {
	return (
		<PageLayout slug={slug}>
			<MasonryInfiniteScroller
				className={styles.grid}
				hasMore={false}
				loadMore={() => {
					// TODO
				}}
				ref={(ref) => {
					setInterval(() => ref?.forceUpdate(), 1000);
				}}
				sizes={SIZES}
			>
				{nodes.map((node) => {
					const thumbnail = node.frontmatter.thumbnail ? (
						<Img fixed={node.frontmatter.thumbnail.childImageSharp.fixed} />
					) : null;

					return (
						<Link className={styles.item} key={node.id} to={node.fields.slug}>
							{thumbnail}
							<div className={styles.title}>{node.frontmatter.title}</div>
							{node.frontmatter.author && (
								<div className={styles.author}>
									by {node.frontmatter.author}
								</div>
							)}
							{node.frontmatter.subtitle && (
								<div className={styles.subtitle}>
									{node.frontmatter.subtitle}
								</div>
							)}
						</Link>
					);
				})}
			</MasonryInfiniteScroller>
		</PageLayout>
	);
};
