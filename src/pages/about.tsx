import React from 'react';
import { Layout } from '../components/layout';
import { Text } from '../components/text';

export default () => (
	<Layout>
		<Text title="About">
			<p>
				The Cookie Collective gathers digital artists involved in real-time
				creation. This covers video games, art installations, video mapping,
				demoscene, algorave, etc.
			</p>
			<p>The collective organizes:</p>
			<ul>
				<li>
					The Cookie Demoparty, a digital art festival which brings together
					various communities and features demos, experimental video games,
					machinimas, concerts, etc.
				</li>
				<li>
					Live coding jams, in which artists train and create visuals and sounds
					in front of the audience.
				</li>
				<li>
					And publishes fanzines, which put the spotlights on various aspects of
					the digital creation.
				</li>
			</ul>
		</Text>
	</Layout>
);
