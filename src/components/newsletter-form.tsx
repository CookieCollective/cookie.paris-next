import addToMailchimp from 'gatsby-plugin-mailchimp';
import React, { FormEvent } from 'react';

export class NewsletterForm extends React.Component {
	state = {
		email: '',
		message: '',
		sending: false,
		sent: false,
		success: false,
	};

	render() {
		const form = this.state.sent ? (
			this.state.success ? (
				<p>Subscribed!</p>
			) : (
				<React.Fragment>
					<p dangerouslySetInnerHTML={{ __html: this.state.message }}></p>
					<button onClick={this.handleRetry}>Retry</button>
				</React.Fragment>
			)
		) : this.state.sending ? (
			<p>Subscribing...</p>
		) : (
			<form onSubmit={this.handleSubscribe}>
				<div>
					<input
						name="email"
						onChange={this.handleChange}
						placeholder="Email address"
						value={this.state.email}
						type="email"
					/>
				</div>
				<div>
					<button type="submit">Subscribe or update your subscription</button>
				</div>
			</form>
		);

		return form;
	}

	private handleChange = (event: FormEvent<HTMLInputElement>) => {
		this.setState({ email: (event.target as HTMLInputElement).value });
	};

	private handleSubscribe = async (event: FormEvent) => {
		const email = this.state.email;

		event.preventDefault();
		this.setState({
			sending: true,
		});
		this.forceUpdate();

		const result = await addToMailchimp(email);
		this.setState({
			message: result.msg,
			sent: true,
			success: result.result === 'success',
		});
		this.forceUpdate();
	};

	private handleRetry = () => {
		this.setState({
			sending: false,
			sent: false,
		});
	};
}
