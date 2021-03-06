import { graphql } from 'gatsby';
import React, { useState } from 'react';
import { FullScreenLayout } from '../components/full-screen-layout';
import { Cell, Grid, GutterSize } from '../components/grid';
import styles from './fanzine-online.module.scss';

export const query = graphql`
	query($slug: String!) {
		node: mdx(fields: { slug: { eq: $slug } }) {
			excerpt
			frontmatter {
				thumbnail {
					publicURL
				}
				title
			}
		}
	}
`;

interface Props {
	data: {
		node: {
			excerpt?: string;
			frontmatter: {
				thumbnail?: {
					publicURL: string;
				};
				title: string;
			};
		};
	};
	pageContext: {
		pages: {
			fixed: {
				base64: string;
			};
			fluid: {
				srcSet: string;
			};
			link?: string;
			original: {
				height: number;
				src: string;
				width: number;
			};
		}[];
		slug: string;
	};
}

export const FanzineOnline: React.FunctionComponent<Props> = ({
	data: { node },
	pageContext: { pages, slug },
}) => {
	const cells = pages.map((page, pageIndex) => {
		const [backgroundOpacity, setBackgroundOpacity] = useState(1);
		const [pictureOpacity, setPictureOpacity] = useState(0);

		const handleCrossFade = (img: HTMLImageElement | null) => {
			if (!img) {
				return;
			}

			const showPicture = () => {
				setBackgroundOpacity(0);
				setPictureOpacity(1);
			};

			if (img.complete) {
				showPicture();
			} else {
				const showPictureAndRemoveHandlers = () => {
					showPicture();
					img.removeEventListener(`load`, showPictureAndRemoveHandlers);
					img.removeEventListener(`error`, showPictureAndRemoveHandlers);
				};

				img.addEventListener(`load`, showPictureAndRemoveHandlers);
				img.addEventListener(`error`, showPictureAndRemoveHandlers);
			}
		};

		const content = (
			<span className={styles.wrapper}>
				<span
					className={styles.background}
					style={{
						backgroundImage: `url("${page.fixed.base64}")`,
						opacity: backgroundOpacity,
						paddingBottom: `${
							(page.original.height / page.original.width) * 100
						}%`,
					}}
				/>
				<picture>
					<source srcSet={page.fluid.srcSet} type="image/jpeg" />
					<img
						className={styles.img}
						src={page.original.src}
						style={{
							opacity: pictureOpacity,
						}}
						loading="lazy"
						ref={handleCrossFade}
					/>
				</picture>
			</span>
		);

		return (
			<Cell key={pageIndex}>
				{page.link ? (
					<a href={page.link} rel="noreferrer noopener" target="_blank">
						{content}
					</a>
				) : (
					content
				)}
			</Cell>
		);
	});

	return (
		<FullScreenLayout
			description={node.excerpt}
			openGraph={{
				images: node.frontmatter.thumbnail && [
					{
						url: node.frontmatter.thumbnail.publicURL,
					},
				],
				title: node.frontmatter.title,
			}}
			slug={slug}
			{...node.frontmatter}
		>
			<Grid columns={2} gutterSize={GutterSize.None}>
				{cells}
			</Grid>
		</FullScreenLayout>
	);
};

export default FanzineOnline;
