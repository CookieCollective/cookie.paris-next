import Img, { FluidObject } from 'gatsby-image';
import React from 'react';
import styles from './article-layout.module.scss';
import { Date } from './date';
import { PageLayout } from './page-layout';

interface Props {
	date?: string;
	endDate?: string;
	slug: string;
	style?: React.CSSProperties;
	thumbnail?: {
		childImageSharp: {
			fluid: FluidObject;
			original: {
				height: number;
				width: number;
			};
		};
	};
	title: string;
}

export const ArticleLayout: React.FunctionComponent<Props> = ({
	children,
	date,
	endDate,
	slug,
	style,
	thumbnail,
	title,
}) => {
	let thumbnailElement: React.ReactNode | undefined;
	if (thumbnail) {
		const maxWidth = `calc(clamp(200px, 100vh - 400px, 400px) / ${thumbnail.childImageSharp.original.height} *
			${thumbnail.childImageSharp.original.width})`;
		thumbnailElement = (
			<Img
				className={styles.image}
				fluid={thumbnail.childImageSharp.fluid}
				style={{
					maxWidth,
				}}
			/>
		);
	}

	return (
		<PageLayout slug={slug}>
			<article className={styles.article} style={style}>
				<header>
					{thumbnailElement}
					<h1>{title}</h1>
					{date ? <Date date={date} endDate={endDate} /> : null}
				</header>
				{children}
			</article>
		</PageLayout>
	);
};
