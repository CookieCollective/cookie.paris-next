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

	export default class extends React.Component<{
		className?: string;
		hasMore: boolean;
		loadMore: () => void;
	}> {}
}

declare module '@mdx-js/react';
