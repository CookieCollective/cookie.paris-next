declare module '@mdx-js/react';

declare module 'gatsby-plugin-mailchimp' {
	export default function(
		email: string
	): Promise<{
		result: 'success' | 'error';
		msg: string;
	}>;
}

declare module 'react-masonry-infinite' {
	import React from 'react';

	export interface Size {
		columns: number;
		gutter: number;
		mq?: string;
	}

	export default class extends React.Component<{
		className?: string;
		hasMore: boolean;
		loadMore: () => void;
		sizes?: Size[];
	}> {}
}

declare module 'raw-loader!*';
