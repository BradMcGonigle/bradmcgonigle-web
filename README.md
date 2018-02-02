# BradMcGonigle.com

This repo contains the personal website of Brad McGonigle that is built with [Gatsby](https://www.gatsbyjs.org/) and [Bulma](http://bulma.io) running on [Netlify](https://netlify.com).  It also uses [Netlify CMS](https://www.netlifycms.org) for basic content management.

It follows the [JAMstack architecture](https://jamstack.org) by using Git as a single source of truth, and [Netlify](https://www.netlify.com) for continuous deployment, and CDN distribution.

## Prerequisites

- Node (v8.2.0 or higher _recommended_)
- [Gatsby CLI](https://www.gatsbyjs.org/docs/)  

### Access Locally
```
$ git clone https://github.com/bradmcgongile/bradmcgongile.git
$ cd [REPO_NAME]
$ yarn
$ npm run develop
```
To test the CMS locally, you'll need run a production build of the site:
```
$ npm run build
$ npm run serve
```

## Getting Started (Without Netlify)
```
$ gatsby new [SITE_DIRECTORY_NAME] https://github.com/bradmcgongile/bradmcgongile/
$ cd [SITE_DIRECTORY_NAME]
$ npm run build
$ npm run serve
```

### Setting up the CMS
Follow the [Netlify CMS Quick Start Guide](https://www.netlifycms.org/docs/quick-start/#authentication) to set up authentication, and hosting.

## Debugging
Windows users might encounter ```node-gyp``` errors when trying to npm install.
To resolve, make sure that you have both Python 2.7 and the Visual C++ build environment installed.
```
npm config set python python2.7
npm install --global --production windows-build-tools
```

[Full details here](https://www.npmjs.com/package/node-gyp 'NPM node-gyp page')
