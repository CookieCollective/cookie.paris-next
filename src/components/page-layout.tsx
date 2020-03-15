import React from 'react';
import { Header } from 'semantic-ui-react';
import styles from './page-layout.module.scss';

interface Props {
	title: string;
}

export const PageLayout: React.FunctionComponent<Props> = ({
	children,
	title,
}) => {
	return (
		<div className={styles.container}>
			<Header as="h1">{title}</Header>
			{children}
		</div>
	);
};
