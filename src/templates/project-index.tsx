import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { ArticleLayout } from '../components/article-layout';
import { BodyRenderer } from '../components/body-renderer';
import { ContentNode } from '../components/default-content-layout';
import styles from './fanzine-index.module.scss';

export const query = graphql`
	query($slug: String!) {
		node: mdx(fields: { slug: { eq: $slug } }) {
			fields {
				slug
			}
			frontmatter {
				file {
					publicURL
				}
			}
			...PostNode
		}
	}
`;

interface Props {
	data: {
		node: ContentNode & {
			fields: {
				slug: string;
			};
			frontmatter: {
				file?: {
					publicURL: string;
				};
			};
		};
	};
	pageContext: {
		slug: string;
	};
}

export const Fanzine: React.FunctionComponent<Props> = ({
	data: { node },
	pageContext: { slug },
}) => {
	return (
		<ArticleLayout
			date={node.frontmatter.date}
			endDate={node.frontmatter.endDate}
			slug={slug}
			title={node.frontmatter.title}
			subtitle={node.frontmatter.subtitle}
		>
			<BodyRenderer>{node.body}</BodyRenderer>
			<div className={styles.links}>
				<Link to={`${node.fields.slug}online/`}>Read online</Link>
				{node.frontmatter.file ? (
					<a href={node.frontmatter.file.publicURL}>Download booklet</a>
				) : null}
			</div>
		</ArticleLayout>
	);
};

export default Fanzine;