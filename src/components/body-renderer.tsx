import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import styles from './article-layout.module.scss';

interface Props {
	children: string;
}

export const BodyRenderer: React.FunctionComponent<Props> = ({ children }) => (
	<div className={styles.content}>
		<MDXRenderer>{children}</MDXRenderer>
	</div>
);
