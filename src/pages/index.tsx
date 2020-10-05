import { Link } from 'gatsby';
import React from 'react';
import { FullScreenLayout } from '../components/full-screen-layout';
import styles from './index.module.scss';

export const Index: React.FunctionComponent = () => {
	return (
		<FullScreenLayout
			backgroundKind="welcome"
			title="Cookie Collective"
			titleTemplate="%s"
		>
			<Link className={styles.center} to="/all">
				<img src="/cookie-collective.png" />
			</Link>
		</FullScreenLayout>
	);
};

export default Index;
