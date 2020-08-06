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

const NavLinks: React.FC<Props> = ({ slug }) => (
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

export const PageLayout: React.FunctionComponent<Props> = ({
	children,
	slug,
}) => (
	<>
		<SEO />
		<Background kind="main" />
		<header>
			<Link to="/">
				<div className={styles.title}>Cookie Collective</div>
				{/* <div className={styles.subtitle}> */}
				{/* Digital artists involved in real-time creation */}
				{/* </div> */}
			</Link>
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
			<NavLinks slug={slug} />
		</header>
		<main className={styles.main}>{children}</main>
		<footer className={styles.footer}>
			<NavLinks slug={slug} />
			<div className={styles.footnotes}>Cookie Collective</div>
		</footer>
	</>
);
