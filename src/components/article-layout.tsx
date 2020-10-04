import Img, { FluidObject } from 'gatsby-image';
import React from 'react';
import styles from './article-layout.module.scss';
import { Date } from './date';
import { PageLayout } from './page-layout';

interface Props {
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
	slug: string;
	style?: React.CSSProperties;
	subtitle?: string;
	title: string;
}

export const ArticleLayout: React.FunctionComponent<Props> = ({
	author,
	children,
	cover,
	date,
	duringEvent,
	endDate,
	location,
	links,
	slug,
	style,
	subtitle,
	title,
}) => {
	return (
		<PageLayout slug={slug}>
			<article className={styles.article} style={style}>
				<header>
					<h1>{title}</h1>
					{cover && (
						<a
							href={cover.childImageSharp.original.src}
							rel="noreferrer noopener"
							target="_blank"
						>
							<Img
								className={styles.image}
								fluid={cover.childImageSharp.fluid}
							/>
						</a>
					)}
					{subtitle && <div className={styles.subtitle}>{subtitle}</div>}
					{date && (
						<div className={styles.preposition}>
							on <Date className={styles.date} date={date} endDate={endDate} />
						</div>
					)}
					{author && (
						<div className={styles.author}>
							<div className={styles.preposition}>by </div>
							{author}
						</div>
					)}
					{duringEvent && (
						<div className={styles.duringEvent}>
							<div className={styles.preposition}>during </div>
							<a key={duringEvent.url} href={duringEvent.url}>
								{duringEvent.name}
							</a>
						</div>
					)}
					{location && (
						<div className={styles.location}>
							<div className={styles.preposition}>at </div>
							{location.url ? (
								<a key={location.url} href={location.url}>
									{location.name}
								</a>
							) : (
								<div>{location.name}</div>
							)}
							{/* <div className={styles.address}>{location.address}</div> */}
						</div>
					)}
					{links && (
						<div className={styles.links}>
							{links.map((link) => (
								<a key={link.url} href={link.url}>
									{link.name}
								</a>
							))}
						</div>
					)}
				</header>
				{children}
			</article>
		</PageLayout>
	);
};
