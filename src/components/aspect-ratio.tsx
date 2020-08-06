import React from 'react';
import styles from './aspect-ratio.module.scss';

interface Props {
	value: number;
}

export const AspectRatio: React.FC<Props> = ({ value, children }) => (
	<div
		className={styles.wrapper}
		style={{
			paddingBottom: 100 / value + '%',
		}}
	>
		{children}
	</div>
);
