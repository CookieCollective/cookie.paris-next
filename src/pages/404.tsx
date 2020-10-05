import React from 'react';
import { PageLayout } from '../components/page-layout';
import styles from './404.module.scss';

export const PageNotFound: React.FunctionComponent = () => (
	<PageLayout slug="/404/" title="Page Not Found">
		<article className={styles.article}>
			<header>
				<h1>Page Not Found</h1>
			</header>
			<p>Oops! The page you are looking for has ben removed or relocated.</p>
		</article>
	</PageLayout>
);

export default PageNotFound;
