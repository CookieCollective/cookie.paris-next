import React from 'react';
import { Header } from 'semantic-ui-react';
import styles from './text.module.scss';

interface IProps {
	title: string;
}

export const Text: React.FunctionComponent<IProps> = ({ children, title }) => (
	<div className={styles.container}>
		<Header as="h1">{title}</Header>
		{children}
	</div>
);
