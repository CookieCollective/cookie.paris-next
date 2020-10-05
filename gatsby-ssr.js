const React = require('react');

const FAVICON_KEY = 'favicon';

const EXTRA_HEAD_COMPONENTS = [
	<link key={FAVICON_KEY} href="/favicon.png" rel="shortcut icon" />,
];

exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
	const headComponents = getHeadComponents();

	headComponents.sort((a, b) => {
		if (a.type === 'title' || a.key === FAVICON_KEY) {
			return -1;
		} else if (b.type === 'title' || b.key === FAVICON_KEY) {
			return 1;
		}
		return 0;
	});

	headComponents.forEach((component) => {
		if (component.type === 'style' && component.props['data-href']) {
			component.type = 'link';
			component.props['href'] = component.props['data-href'];
			component.props['rel'] = 'stylesheet';
			component.props['type'] = 'text/css';

			delete component.props['data-href'];
			delete component.props['dangerouslySetInnerHTML'];
		}
	});

	replaceHeadComponents(headComponents);
};

exports.onRenderBody = ({ setHeadComponents }) => {
	setHeadComponents(EXTRA_HEAD_COMPONENTS);
};
