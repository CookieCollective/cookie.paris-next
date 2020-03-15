import { Link } from 'gatsby';
import React from 'react';
import {
	Container,
	Grid,
	Header,
	Icon,
	Menu,
	Responsive,
	Segment,
	Sidebar,
} from 'semantic-ui-react';
import { NewsletterForm } from './newsletter-form';
import styles from './screen-layout.module.scss';
import { SEO } from './seo';

const IconLinks: React.FunctionComponent = () => (
	<Menu.Item className="icon-links">
		<a href="mailto:contact@cookie.paris" target="_blank" title="Contact us">
			<Icon name="mail outline" />
		</a>
		<a
			href="https://www.facebook.com/CookieDemoparty/"
			target="_blank"
			title="Visit our Facebook page"
		>
			<Icon name="facebook" />
		</a>
		<a
			href="https://github.com/CookieCollective"
			target="_blank"
			title="Visit our GitHub page"
		>
			<Icon name="github" />
		</a>
		<a
			href="https://www.instagram.com/cookiedemoparty/"
			target="_blank"
			title="Visit our Instagram page"
		>
			<Icon name="instagram" />
		</a>
		<a
			href="https://www.twitch.tv/cookiecollectif"
			target="_blank"
			title="Visit our Twitch page"
		>
			<Icon name="twitch" />
		</a>
		<a
			href="https://twitter.com/CookieDemoparty"
			target="_blank"
			title="Visit our Twitter page"
		>
			<Icon name="twitter" />
		</a>
		<a
			href="https://www.youtube.com/channel/UC20eaOqnUX156pkXtlWg9Kw"
			target="_blank"
			title="Visit our YouTube page"
		>
			<Icon name="youtube" />
		</a>
	</Menu.Item>
);

class DesktopContainer extends React.Component {
	render() {
		const { children } = this.props;

		return (
			<Responsive minWidth={Responsive.onlyTablet.minWidth}>
				<Menu fixed="top" size="large" pointing>
					<Container>
						<Menu.Item as={Link} to="/" active>
							Home
						</Menu.Item>
						<Menu.Item as={Link} to="/events/">
							Events
						</Menu.Item>
						<Menu.Item as={Link} to="/fanzines/">
							Fanzines
						</Menu.Item>
						<Menu.Item as={Link} to="/galleries/">
							Galleries
						</Menu.Item>

						<Menu.Menu position="right">
							<Menu.Item as={Link} to="/about/">
								About
							</Menu.Item>
							<IconLinks />
						</Menu.Menu>
					</Container>
				</Menu>

				<Segment
					textAlign="center"
					style={{ minHeight: 40, padding: '1em 0em' }}
					vertical
				></Segment>

				{children}
			</Responsive>
		);
	}
}

class MobileContainer extends React.Component {
	state = {
		sidebarOpened: false,
	};

	render() {
		const { children } = this.props;
		const { sidebarOpened } = this.state;

		return (
			<Responsive
				as={Sidebar.Pushable}
				maxWidth={Responsive.onlyMobile.maxWidth}
			>
				<Sidebar
					as={Menu}
					animation="push"
					onHide={this.hideSidebar}
					vertical
					visible={sidebarOpened}
				>
					<Menu.Item as={Link} to="/" active>
						Home
					</Menu.Item>
					<Menu.Item as={Link} to="/events/">
						Events
					</Menu.Item>
					<Menu.Item as={Link} to="/fanzines/">
						Fanzines
					</Menu.Item>
					<Menu.Item as={Link} to="/media/">
						Media
					</Menu.Item>
					<Menu.Item as={Link} to="/projects/">
						Projects
					</Menu.Item>
					<Menu.Item as={Link} to="/about/">
						About
					</Menu.Item>
					<IconLinks />
				</Sidebar>

				<Sidebar.Pusher dimmed={sidebarOpened}>
					<Segment
						textAlign="center"
						style={{ marginBottom: '-30px' }}
						vertical
					>
						<Container>
							<Menu secondary size="large">
								<Menu.Item onClick={this.showSidebar}>
									<Icon name="sidebar" />
								</Menu.Item>
								<Menu.Menu position="right">
									<Menu.Item as={Link} to="/" active>
										Home
									</Menu.Item>
									<Menu.Item as={Link} to="/events/">
										Events
									</Menu.Item>
								</Menu.Menu>
							</Menu>
						</Container>
					</Segment>

					{children}
				</Sidebar.Pusher>
			</Responsive>
		);
	}

	private hideSidebar = () => this.setState({ sidebarOpened: false });
	private showSidebar = () => this.setState({ sidebarOpened: true });
}

const ResponsiveContainer: React.FunctionComponent = ({ children }) => (
	<>
		<DesktopContainer>{children}</DesktopContainer>
		<MobileContainer>{children}</MobileContainer>
	</>
);

export class DefaultScreenLayout extends React.Component {
	render() {
		const { children } = this.props;

		return (
			<>
				<SEO />
				<ResponsiveContainer>
					<Segment>{children}</Segment>

					<Segment className={styles.footer} vertical>
						<Container>
							<Grid divided stackable>
								<Grid.Row>
									<Grid.Column width={7}>
										<Header as="h4" inverted>
											Cookie Collective
										</Header>
										<p>
											The Cookie Collective gathers digital artists involved in
											real-time creation. This covers video games, art
											installations, video mapping, demoscene, algorave, etc.
										</p>
									</Grid.Column>
									<Grid.Column width={9}>
										<Header as="h4" inverted>
											Newsletter
										</Header>
										<p>
											We send a monthly newsletter with our upcoming events,
											shaders we wrote, etc. Stay in touch!
										</p>
										<NewsletterForm />
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</Container>
					</Segment>
				</ResponsiveContainer>
			</>
		);
	}
}

export class FullScreenLayout extends React.Component {
	render() {
		const { children } = this.props;

		return (
			<>
				<SEO />
				{children}
			</>
		);
	}
}
