import React from 'react';
import { Icon } from 'semantic-ui-react';

interface IContentTypeIconProps {
	contentType: string;
}

const ICON_NAME_BY_CONTENT_TYPES: { [contentType: string]: string } = {
	event: 'calendar alternate outline',
	post: 'pencil alternate',
};

export const ContentTypeIcon: React.FunctionComponent<IContentTypeIconProps> = ({
	contentType,
}) => {
	const iconName: any = ICON_NAME_BY_CONTENT_TYPES[contentType];
	if (!iconName) {
		throw new Error(`Unknown content type ${contentType}.`);
	}
	return <Icon name={iconName} />;
};
