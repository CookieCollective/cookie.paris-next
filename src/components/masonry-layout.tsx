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
		fields {
			collection
			slug
		}
		frontmatter {
			author
			duringEvent {
				name
			}
			location {
				name
			}
			subtitle
			thumbnail {
				childImageSharp {
					fixed(width: 280) {
						...GatsbyImageSharpFixed
					}
				}
			}
			title
			year: date(formatString: "YYYY")
		}
		id
	}
`;

export interface GridNode {
	fields: {
		collection: string;
		slug: string;
	};
	frontmatter: {
		author?: string;
		duringEvent?: {
			name: string;
		};
		location?: {
			name: string;
		};
		subtitle?: string;
		thumbnail?: {
			childImageSharp: {
				fixed: any;
			};
		};
		title: string;
		year: string;
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
					let subtitle = node.frontmatter.subtitle;

					if (!subtitle) {
						const subtitles: string[] = [];

						if (node.frontmatter.author) {
							subtitles.push(`by ${node.frontmatter.author}`);
						}

						if (node.frontmatter.duringEvent) {
							subtitles.push(`during ${node.frontmatter.duringEvent.name}`);
						}

						if (node.frontmatter.location) {
							subtitles.push(`at ${node.frontmatter.location.name}`);
						}

						subtitle = subtitles.join(' ');
					}

					subtitle += ` (${node.frontmatter.year})`;

					return (
						<Link className={styles.item} key={node.id} to={node.fields.slug}>
							{node.frontmatter.thumbnail && (
								<Img fixed={node.frontmatter.thumbnail.childImageSharp.fixed} />
							)}
							<div className={styles.title}>{node.frontmatter.title}</div>
							{subtitle && <div className={styles.subtitle}>{subtitle}</div>}
						</Link>
					);
				})}
			</MasonryInfiniteScroller>
		</PageLayout>
	);
};
