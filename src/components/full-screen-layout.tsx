import { GatsbySeo, GatsbySeoProps } from 'gatsby-plugin-next-seo';
import React from 'react';
import { BackgroundKind } from '../background-service';
import { Background } from './background';

interface Props extends GatsbySeoProps {
	backgroundKind?: BackgroundKind;
}

export const FullScreenLayout: React.FunctionComponent<Props> = (props) => (
	<>
		<GatsbySeo {...props} />
		<Background kind={props.backgroundKind} />
		<main>{props.children}</main>
	</>
);
