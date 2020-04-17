import { Link } from 'gatsby';
import React from 'react';
import { FullScreenLayout } from '../components/full-screen-layout';

export const Index: React.FunctionComponent = ({}) => {
	return (
		<FullScreenLayout backgroundKind="welcome">
			<Link to="/posts">Enter website</Link>
		</FullScreenLayout>
	);
};

export default Index;
