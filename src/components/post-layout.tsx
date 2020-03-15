import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { Header, Image } from 'semantic-ui-react';
import { Date } from './content';
import styles from './page-layout.module.scss';

export const query = graphql`
	fragment PostNode on Mdx {
		body
		frontmatter {
			date(formatString: "LL")
			endDate(formatString: "LL")
			thumbnail {
				childImageSharp {
					fixed(width: 280) {
						...GatsbyImageSharpFixed
					}
				}
			}
			title
		}
	}
`;

export interface PostNode {
	body: string;
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
}

interface Props {
	afterTitle?: React.ReactNode;
	beforeTitle?: React.ReactNode;
	node: PostNode;
}

export const PostLayout: React.FunctionComponent<Props> = ({
	afterTitle,
	beforeTitle,
	node,
}) => {
	const thumbnailElement = node.frontmatter.thumbnail ? (
		<Image
			as={Img}
			fixed={node.frontmatter.thumbnail.childImageSharp.fixed}
			floated="right"
		/>
	) : null;

	return (
		<div className={styles.container}>
			{thumbnailElement}
			<Date date={node.frontmatter.date} endDate={node.frontmatter.endDate} />
			{beforeTitle}
			<Header as="h1">{node.frontmatter.title}</Header>
			{afterTitle}
			<MDXRenderer>{node.body}</MDXRenderer>
		</div>
	);
};
