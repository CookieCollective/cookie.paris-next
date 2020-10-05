import { GatsbySeoProps } from 'gatsby-plugin-next-seo';
import React from 'react';
import { BackgroundKind } from '../background-service';
import { Background } from './background';
import { Seo } from './seo';

interface Props extends GatsbySeoProps {
	backgroundKind?: BackgroundKind;
	slug: string;
}

export const FullScreenLayout: React.FunctionComponent<Props> = (props) => (
	<>
		<Seo {...props} />
		<Background kind={props.backgroundKind} />
		<main>{props.children}</main>
	</>
);
