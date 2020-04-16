import React from 'react';
import styles from './grid.module.scss';

export enum GutterSize {
	None = 0,
	Narrow = 10,
}

const Context = React.createContext({
	columns: 1,
	gutterSize: GutterSize.None,
});

interface CellProps {
	span?: number;
}

function gcd(a: number, b: number) {
	while (b) {
		const t = b;
		b = a % b;
		a = t;
	}
	return a;
}

export const Cell: React.FunctionComponent<CellProps> = ({
	children,
	span,
}) => {
	span = span || 1;
	const { columns, gutterSize } = React.useContext(Context);
	const cd = gcd(span, columns);
	return (
		<div
			className={(styles as any)[`n${span / cd}d${columns / cd}`]}
			style={{
				padding: `${gutterSize / 2}px`,
			}}
		>
			{children}
		</div>
	);
};

interface GridProps {
	columns: number;
	gutterSize: GutterSize;
}

export const Grid: React.FunctionComponent<GridProps> = ({
	children,
	columns,
	gutterSize,
}) => {
	return (
		<div
			className={styles.grid}
			style={{
				margin: `-${gutterSize / 2}px`,
			}}
		>
			<Context.Provider value={{ columns, gutterSize }}>
				{children}
			</Context.Provider>
		</div>
	);
};
