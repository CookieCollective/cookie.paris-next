import React from 'react';
import { BackgroundKind, backgroundService } from '../background-service';

interface Props {
	kind?: BackgroundKind;
}

export class Background extends React.Component<Props> {
	constructor(props: Props) {
		super(props);

		backgroundService.display(props.kind);
	}

	getSnapshotBeforeUpdate() {
		backgroundService.display(this.props.kind);
		return null;
	}

	render() {
		return null;
	}
}
