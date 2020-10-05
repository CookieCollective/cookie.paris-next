import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { Link } from 'gatsby';
import { GatsbySeoProps } from 'gatsby-plugin-next-seo';
import React from 'react';
import { Background } from './background';
import styles from './page-layout.module.scss';
import { Seo } from './seo';

interface NavLinksProps {
	slug: string;
}

const NavLinks: React.FC<NavLinksProps> = ({ slug }) => (
	<nav className={styles.pageLinks}>
		<Link
			to="/all/"
			className={classnames({
				[styles.active]: slug === '/all/',
			})}
		>
			All
		</Link>
		<Link
			to="/news/"
			className={classnames({
				[styles.active]: slug === '/news/',
			})}
		>
			News
		</Link>
		<Link
			to="/events/"
			className={classnames({
				[styles.active]: slug === '/events/',
			})}
		>
			Events
		</Link>
		<Link
			to="/photos/"
			className={classnames({
				[styles.active]: slug === '/photos/',
			})}
		>
			Photos
		</Link>
		<Link
			to="/projects/"
			className={classnames({
				[styles.active]: slug === '/projects/',
			})}
		>
			Projects
		</Link>
		<Link
			to="/about/"
			className={classnames({
				[styles.active]: slug === '/about/',
			})}
		>
			About
		</Link>
	</nav>
);

interface Props extends GatsbySeoProps {
	slug: string;
}

export const PageLayout: React.FunctionComponent<Props> = (props) => (
	<>
		<Seo {...props} />
		<Background kind="main" />
		<header>
			<Link to="/">
				<div className={styles.title}>Cookie Collective</div>
			</Link>
			<div className={styles.socialLinks}>
				<a
					href="mailto:contact@cookie.paris"
					rel="noreferrer noopener"
					target="_blank"
					title="Contact us"
				>
					Contact
				</a>
				<a
					href="https://discord.gg/VZQGhUC"
					rel="noreferrer noopener"
					target="_blank"
					title="Join our Discord server"
				>
					<FontAwesomeIcon icon={['fab', 'discord']} />
				</a>
				<a
					href="https://www.facebook.com/CookieDemoparty/"
					rel="noreferrer noopener"
					target="_blank"
					title="Visit our Facebook page"
				>
					<FontAwesomeIcon icon={['fab', 'facebook']} />
				</a>
				<a
					href="https://github.com/CookieCollective"
					rel="noreferrer noopener"
					target="_blank"
					title="Visit our GitHub page"
				>
					<FontAwesomeIcon icon={['fab', 'github']} />
				</a>
				<a
					href="https://www.instagram.com/cookiedemoparty/"
					rel="noreferrer noopener"
					target="_blank"
					title="Visit our Instagram page"
				>
					<FontAwesomeIcon icon={['fab', 'instagram']} />
				</a>
				<a
					href="https://www.twitch.tv/cookiecollectif"
					rel="noreferrer noopener"
					target="_blank"
					title="Visit our Twitch page"
				>
					<FontAwesomeIcon icon={['fab', 'twitch']} />
				</a>
				<a
					href="https://twitter.com/CookieDemoparty"
					rel="noreferrer noopener"
					target="_blank"
					title="Visit our Twitter page"
				>
					<FontAwesomeIcon icon={['fab', 'twitter']} />
				</a>
				<a
					href="https://www.youtube.com/channel/UC20eaOqnUX156pkXtlWg9Kw"
					rel="noreferrer noopener"
					target="_blank"
					title="Visit our YouTube page"
				>
					<FontAwesomeIcon icon={['fab', 'youtube']} />
				</a>
				<Link
					className={classnames({
						[styles.active]: props.slug === '/newsletter/',
					})}
					title="Subscribe to the newsletter"
					to="/newsletter/"
				>
					Newsletter
				</Link>
			</div>
			<NavLinks slug={props.slug} />
		</header>
		<main className={styles.main}>{props.children}</main>
		<footer className={styles.footer}>
			<NavLinks slug={props.slug} />
			<div className={styles.footnotes}>
				Cookie Collective &ndash;{' '}
				<Link
					className={classnames({
						[styles.active]: props.slug === '/credits/',
					})}
					title="Credits"
					to="/credits/"
				>
					Credits
				</Link>
			</div>
		</footer>
	</>
);
