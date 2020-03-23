import { graphql, Link } from 'gatsby';
import React from 'react';
import { Button } from 'semantic-ui-react';
import { PostLayout, PostNode } from '../components/post-layout';
import { DefaultScreenLayout } from '../components/screen-layout';

export const query = graphql`
	query($slug: String!) {
		node: mdx(fields: { slug: { eq: $slug } }) {
			fields {
				slug
			}
			frontmatter {
				file {
					publicURL
				}
			}
			...PostNode
		}
	}
`;

interface Props {
	data: {
		node: PostNode & {
			fields: {
				slug: string;
			};
			frontmatter: {
				file?: {
					publicURL: string;
				};
			};
		};
	};
}

export const Fanzine: React.FunctionComponent<Props> = ({ data: { node } }) => {
	return (
		<DefaultScreenLayout>
			<PostLayout
				afterTitle={
					<p>
						<Button as={Link} primary to={`${node.fields.slug}online/`}>
							Read online
						</Button>
						{node.frontmatter.file ? (
							<Button secondary href={node.frontmatter.file.publicURL}>
								Download PDF
							</Button>
						) : null}
					</p>
				}
				node={node}
			/>
		</DefaultScreenLayout>
	);
};

export default Fanzine;
