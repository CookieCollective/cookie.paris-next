import React from 'react';
import { SEO } from './seo';

export const FullScreenLayout: React.FunctionComponent = ({ children }) => (
	<>
		<SEO />
		<main>{children}</main>
	</>
);
