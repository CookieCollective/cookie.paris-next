import React, { createRef } from 'react';
import { Image, Input, Menu, Segment, Sticky } from 'semantic-ui-react';

export class StickyMenu extends React.Component {
	contextRef = createRef<HTMLDivElement>();

	render() {
		return (
			<div ref={this.contextRef}>
				<Sticky context={this.contextRef}>
					<Menu
						attached="top"
						style={{ backgroundColor: '#fff', paddingTop: '1em' }}
					>
						<Menu.Item as="a" active name="bio" />
						<Menu.Item as="a" active={false} name="photos" />
						<Menu.Menu position="right">
							<Menu.Item>
								<Input
									transparent
									icon={{ name: 'search', link: true }}
									placeholder="Search users..."
								/>
							</Menu.Item>
						</Menu.Menu>
					</Menu>
				</Sticky>
				<Segment attached="bottom">{this.props.children}</Segment>
			</div>
		);
	}
}
