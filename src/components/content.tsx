import React from 'react';
import { Icon } from 'semantic-ui-react';

interface ContentTypeIconProps {
	contentType: string;
}

const CONTENT_TYPE_TO_ICON_NAME_MAPPING: { [contentType: string]: string } = {
	event: 'calendar alternate outline',
	fanzine: 'book',
	gallery: 'images outline',
	post: 'pencil alternate',
};

export const ContentTypeIcon: React.FunctionComponent<ContentTypeIconProps> = ({
	contentType,
}) => {
	const iconName: any = CONTENT_TYPE_TO_ICON_NAME_MAPPING[contentType];
	if (!iconName) {
		throw new Error(`Unknown content type ${contentType}.`);
	}
	return <Icon name={iconName} />;
};

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
			{date} <Icon name="caret right" />
			{endDate}
		</div>
	) : (
		<div className={className}>{date}</div>
	);
