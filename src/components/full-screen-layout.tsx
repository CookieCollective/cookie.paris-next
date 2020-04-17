import React from 'react';
import { BackgroundKind } from '../background-service';
import { Background } from './background';
import { SEO } from './seo';

interface Props {
	backgroundKind?: BackgroundKind;
}

export const FullScreenLayout: React.FunctionComponent<Props> = ({
	children,
	backgroundKind,
}) => (
	<>
		<SEO />
		<Background kind={backgroundKind} />
		<main>{children}</main>
	</>
);
