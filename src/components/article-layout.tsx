import { graphql } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import React from 'react';
import styles from './article-layout.module.scss';
import { Date } from './date';
import { PageLayout } from './page-layout';

export const query = graphql`
	fragment MdxArticleData on Mdx {
		frontmatter {
			author
			cover {
				childImageSharp {
					fluid(jpegQuality: 90, toFormat: JPG, srcSetBreakpoints: [400, 760]) {
						...GatsbyImageSharpFluid
					}
					original {
						height
						src
						width
					}
				}
			}
			date(formatString: "LL")
			duringEvent {
				name
				url
			}
			endDate(formatString: "LL")
			location {
				address
				name
				url
			}
			links {
				name
				url
			}
			subtitle
			thumbnail {
				childImageSharp {
					fixed(jpegQuality: 90, toFormat: JPG, width: 600) {
						...GatsbyImageSharpFixed
					}
				}
			}
			title
		}
	}
`;

export interface MdxArticleData {
	frontmatter: {
		author?: string;
		cover?: {
			childImageSharp: {
				fluid: FluidObject;
				original: {
					height: number;
					src: string;
					width: number;
				};
			};
		};
		date?: string;
		duringEvent?: {
			name: string;
			url: string;
		};
		endDate?: string;
		links?: {
			name: string;
			url: string;
		}[];
		location?: {
			address: string;
			name: string;
			url: string;
		};
		subtitle?: string;
		thumbnail: {
			publicURL: string;
		};
		title: string;
	};
}

interface Props {
	description?: string;
	node: MdxArticleData;
	slug: string;
	style?: React.CSSProperties;
}

export const ArticleLayout: React.FunctionComponent<Props> = (props) => {
	const { frontmatter } = props.node;

	return (
		<PageLayout
			description={props.description}
			slug={props.slug}
			openGraph={{
				images: frontmatter.thumbnail && [
					{
						url: frontmatter.thumbnail.publicURL,
					},
				],
				title: frontmatter.title,
			}}
			title={
				frontmatter.date
					? `${frontmatter.title} (${frontmatter.date})`
					: frontmatter.title
			}
		>
			<article className={styles.article} style={props.style}>
				<header>
					<h1>{frontmatter.title}</h1>
					{frontmatter.cover && (
						<a
							href={frontmatter.cover.childImageSharp.original.src}
							rel="noreferrer noopener"
							target="_blank"
						>
							<Img
								className={styles.image}
								fluid={frontmatter.cover.childImageSharp.fluid}
							/>
						</a>
					)}
					{frontmatter.subtitle && (
						<div className={styles.subtitle}>{frontmatter.subtitle}</div>
					)}
					{frontmatter.date && (
						<div className={styles.preposition}>
							on{' '}
							<Date
								className={styles.date}
								date={frontmatter.date}
								endDate={frontmatter.endDate}
							/>
						</div>
					)}
					{frontmatter.author && (
						<div className={styles.author}>
							<div className={styles.preposition}>by </div>
							{frontmatter.author}
						</div>
					)}
					{frontmatter.duringEvent && (
						<div className={styles.duringEvent}>
							<div className={styles.preposition}>during </div>
							<a
								key={frontmatter.duringEvent.url}
								href={frontmatter.duringEvent.url}
							>
								{frontmatter.duringEvent.name}
							</a>
						</div>
					)}
					{frontmatter.location && (
						<div className={styles.location}>
							<div className={styles.preposition}>at </div>
							{frontmatter.location.url ? (
								<a
									key={frontmatter.location.url}
									href={frontmatter.location.url}
								>
									{frontmatter.location.name}
								</a>
							) : (
								<div>{frontmatter.location.name}</div>
							)}
							{/* <div className={styles.address}>{location.address}</div> */}
						</div>
					)}
					{frontmatter.links && (
						<div className={styles.links}>
							{frontmatter.links.map((link) => (
								<a key={link.url} href={link.url}>
									{link.name}
								</a>
							))}
						</div>
					)}
				</header>
				{props.children}
			</article>
		</PageLayout>
	);
};
