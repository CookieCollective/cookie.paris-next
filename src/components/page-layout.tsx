import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { Link } from 'gatsby';
import React from 'react';
import { Background } from './background';
import styles from './page-layout.module.scss';
import { SEO } from './seo';

interface Props {
	slug: string;
}

export const PageLayout: React.FunctionComponent<Props> = ({
	children,
	slug,
}) => (
	<>
		<SEO />
		<Background kind="main" />

		<header>
			<div className={styles.title}>
				<Link to="/">Cookie Collective</Link>
			</div>
			<div className={styles.subtitle}>
				Digital artists involved in real-time creation
			</div>

			<div className={styles.socialLinks}>
				<a
					href="mailto:contact@cookie.paris"
					target="_blank"
					title="Contact us"
				>
					Contact
				</a>
				<span className={styles.icons}>
					<a
						href="https://discord.gg/VZQGhUC"
						target="_blank"
						title="Join our Discord server"
					>
						<FontAwesomeIcon icon={['fab', 'discord']} />
					</a>
					<a
						href="https://www.facebook.com/CookieDemoparty/"
						target="_blank"
						title="Visit our Facebook page"
					>
						<FontAwesomeIcon icon={['fab', 'facebook']} />
					</a>
					<a
						href="https://github.com/CookieCollective"
						target="_blank"
						title="Visit our GitHub page"
					>
						<FontAwesomeIcon icon={['fab', 'github']} />
					</a>
					<a
						href="https://www.instagram.com/cookiedemoparty/"
						target="_blank"
						title="Visit our Instagram page"
					>
						<FontAwesomeIcon icon={['fab', 'instagram']} />
					</a>
					<a
						href="https://www.twitch.tv/cookiecollectif"
						target="_blank"
						title="Visit our Twitch page"
					>
						<FontAwesomeIcon icon={['fab', 'twitch']} />
					</a>
					<a
						href="https://twitter.com/CookieDemoparty"
						target="_blank"
						title="Visit our Twitter page"
					>
						<FontAwesomeIcon icon={['fab', 'twitter']} />
					</a>
					<a
						href="https://www.youtube.com/channel/UC20eaOqnUX156pkXtlWg9Kw"
						target="_blank"
						title="Visit our YouTube page"
					>
						<FontAwesomeIcon icon={['fab', 'youtube']} />
					</a>
				</span>
				<Link to="/newsletter/" title="Subscribe to the newsletter">
					Newsletter
				</Link>
			</div>
		</header>

		<nav className={styles.pageLinks}>
			<Link
				to="/posts/"
				className={classnames({
					[styles.active]: slug === '/posts/',
				})}
			>
				Posts
			</Link>
			<Link
				to="/media/"
				className={classnames({
					[styles.active]: slug === '/media/',
				})}
			>
				Media
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
				to="/about/"
				className={classnames({
					[styles.active]: slug === '/about/',
				})}
			>
				About
			</Link>
		</nav>

		<main className={styles.main}>{children}</main>
	</>
);
