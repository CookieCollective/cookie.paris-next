import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';

interface Props {
	children: string;
}

export const BodyRenderer: React.FunctionComponent<Props> = ({ children }) => (
	<MDXRenderer>{children}</MDXRenderer>
);
