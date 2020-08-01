import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
			{date}
			<FontAwesomeIcon icon={['fab', 'caret-right']} />
			{endDate}
		</div>
	) : (
		<div className={className}>{date}</div>
	);
