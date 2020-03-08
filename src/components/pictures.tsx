import React from 'react';
import { Grid, GridColumn, GridRow } from 'semantic-ui-react';

export const TwoColumnGrid: React.FunctionComponent = ({ children }) => (
	<Grid columns={2}>
		<GridRow>
			<GridColumn>A</GridColumn>
			<GridColumn>B</GridColumn>
		</GridRow>
	</Grid>
);
