import React from 'react';
import { AspectRatio } from './aspect-ratio';

interface Props {
	aspectRatio?: number;
	videoId: string;
}

export const YoutubeVideo: React.FC<Props> = ({ aspectRatio, videoId }) => (
	<AspectRatio value={aspectRatio || 16 / 9}>
		<iframe
			src={'https://www.youtube.com/embed/' + videoId}
			frameBorder={0}
			allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
		></iframe>
	</AspectRatio>
);
