import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { graphql } from 'gatsby';
import React from 'react';
import { ArticleLayout } from '../components/article-layout';
import { BodyRenderer } from '../components/body-renderer';
import { MdxDefaultContentData } from '../components/default-content-layout';
import { YoutubeVideo } from '../components/video-iframe';
import styles from './demoparty-report.module.scss';

export const query = graphql`
	query($slug: String!) {
		node: mdx(fields: { slug: { eq: $slug } }) {
			...MdxDefaultContentData
			frontmatter {
				releases {
					authors {
						person
						role
					}
					competition {
						category
						rank
					}
					links {
						icon
						name
						url
					}
					media {
						youTube
					}
					title
				}
			}
		}
	}
`;

interface Props {
	data: {
		node: MdxDefaultContentData & {
			frontmatter: {
				releases: {
					authors: {
						person: string;
						role: string;
					}[];
					competition: {
						category: string;
						rank: number;
					};
					links?: {
						icon?: string[];
						name: string;
						url: string;
					}[];
					media?: {
						youTube?: string;
					}[];
					title: string;
				}[];
			};
		};
	};
	pageContext: {
		slug: string;
	};
}

function ordSuffix(n: number) {
	const u = n % 10;
	if (u === 1 && n !== 11) {
		return 'st';
	}
	if (u === 2 && n !== 12) {
		return 'nd';
	}
	if (u === 3 && n !== 13) {
		return 'rd';
	}
	return 'th';
}

export const DemopartyReport: React.FunctionComponent<Props> = ({
	data: { node },
	pageContext: { slug },
}) => {
	return (
		<ArticleLayout node={node} slug={slug}>
			<BodyRenderer>{node.body}</BodyRenderer>
			<h2>Releases</h2>
			{node.frontmatter.releases.map((release) => (
				<React.Fragment key={release.title}>
					<h3>{release.title}</h3>
					<div>
						by{' '}
						{release.authors
							.map((author) => `${author.person} (${author.role})`)
							.join(', ')}
						.
					</div>
					<div>
						ranked {release.competition.rank}
						{ordSuffix(release.competition.rank)} in the{' '}
						{release.competition.category} competition
					</div>

					{release.media && (
						<div>
							{release.media.map((media) => {
								if (media.youTube) {
									return (
										<YoutubeVideo key={media.youTube} videoId={media.youTube} />
									);
								}
							})}
						</div>
					)}

					{release.links && (
						<div>
							{release.links.map((link) => (
								<span key={link.url} className={styles.link}>
									<a href={link.url}>
										{link.icon && (
											<FontAwesomeIcon
												className={styles.icon}
												icon={link.icon as any}
											/>
										)}
										{link.name}
									</a>
								</span>
							))}
						</div>
					)}
				</React.Fragment>
			))}
		</ArticleLayout>
	);
};

export default DemopartyReport;
