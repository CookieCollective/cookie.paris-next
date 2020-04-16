import React from 'react';

export interface DateProps {
	className?: string;
	date: string;
	endDate?: string;
}

export const Date: React.FunctionComponent<DateProps> = ({
	className,
	date,
	endDate,
}) =>
	endDate ? (
		<div className={className}>
			{date} <span className="caret right" />
			{endDate}
		</div>
	) : (
		<div className={className}>{date}</div>
	);
