import { Link } from 'gatsby';
import React from 'react';
import { FullScreenLayout } from '../components/full-screen-layout';
import styles from './index.module.scss';

export const Index: React.FunctionComponent = ({}) => {
	return (
		<FullScreenLayout backgroundKind="welcome">
			<Link className={styles.center} to="/posts">
				<img src="/cookie-collective-shadow.png" />
			</Link>
		</FullScreenLayout>
	);
};

export default Index;
