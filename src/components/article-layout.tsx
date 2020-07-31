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
	endDate?: string;
	links?: {
		name: string;
		url: string;
	}[];
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
	endDate,
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
					{subtitle && <h2>{subtitle}</h2>}
					{author && <h2>{author}</h2>}
					{date && (
						<h3>
							<Date date={date} endDate={endDate} />
						</h3>
					)}
					{cover && (
						<a href={cover.childImageSharp.original.src} target="_blank">
							<Img
								className={styles.image}
								fluid={cover.childImageSharp.fluid}
							/>
						</a>
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
