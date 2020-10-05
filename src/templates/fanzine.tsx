import { graphql, Link } from 'gatsby';
import React from 'react';
import { ArticleLayout, MdxArticleData } from '../components/article-layout';
import { BodyRenderer } from '../components/body-renderer';
import styles from './fanzine.module.scss';

export const query = graphql`
	query($slug: String!) {
		node: mdx(fields: { slug: { eq: $slug } }) {
			body
			excerpt
			frontmatter {
				file {
					publicURL
				}
				title
			}
			...MdxArticleData
		}
	}
`;

interface Props {
	data: {
		node: MdxArticleData & {
			body: string;
			excerpt?: string;
			frontmatter: {
				file?: {
					publicURL: string;
				};
				title: string;
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
		<ArticleLayout description={node.excerpt} node={node} slug={slug}>
			<BodyRenderer>{node.body}</BodyRenderer>
			<div className={styles.links}>
				<Link to={`${slug}online/`}>Read online</Link>
				{node.frontmatter.file && (
					<a href={node.frontmatter.file.publicURL}>Download booklet</a>
				)}
			</div>
		</ArticleLayout>
	);
};

export default Fanzine;
