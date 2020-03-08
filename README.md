# cookie.paris

Sources of https://cookie.paris/ which are transformed into static pages by [Gatsby](https://www.gatsbyjs.org/).

## Content Type

1. Events
1. Posts

## Environment setup

1. Clone
1. Apply patch
1. Run server

### Clone

Clone the repository and execute `npm install` inside.

### Apply patch

While [this PR is not merged yet], you'll have to follow this extra steps.

Use [Yarn](https://yarnpkg.com/en/docs/install) for all steps, and not NPM!

    git clone https://github.com/gatsbyjs/gatsby.git
    cd gatsby
    yarn run bootstrap
    pushd packages/gatsby-plugin-sharp
    yarn link
    popd
    pushd packages/gatsby-remark-images
    yarn link
    popd

In this repository's clone:

    yarn link gatsby-plugin-sharp
    yarn link gatsby-remark-images

### Run

In this repository's clone:

    npm start
