import { graphql } from 'gatsby';
import React, { useState } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import { FullScreenLayout } from '../components/screen-layout';
import styles from './fanzine-online.module.scss';

export const query = graphql`
	query($slug: String!) {
		node: mdx(fields: { slug: { eq: $slug } }) {
			body
			frontmatter {
				title
			}
		}
	}
`;

interface Props {
	data: {
		node: {
			frontmatter: {
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
	};
}

export const FanzineOnline: React.FunctionComponent<Props> = ({
	data: { node },
	pageContext: { pages },
}) => {
	const pageElements = pages.map((page, pageIndex) => {
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
						paddingBottom:
							(page.original.height / page.original.width) * 100 + '%',
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
			<GridColumn key={pageIndex}>
				{page.link ? (
					<a href={page.link} target="_blank">
						{content}
					</a>
				) : (
					content
				)}
			</GridColumn>
		);
	});

	return (
		<FullScreenLayout>
			<Grid className="seamless" columns={2} stackable>
				{pageElements}
			</Grid>
		</FullScreenLayout>
	);
};

export default FanzineOnline;
