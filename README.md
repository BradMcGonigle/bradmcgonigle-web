# BradMcGonigle.com

[![CircleCI](https://circleci.com/gh/BradMcGonigle/bradmcgonigle/tree/master.svg?style=svg)](https://circleci.com/gh/BradMcGonigle/bradmcgonigle/tree/master)
[![Netlify Status](https://api.netlify.com/api/v1/badges/6835649b-b4f3-47b2-a5cf-5c711952c4f9/deploy-status)](https://app.netlify.com/sites/bradmcgonigle/deploys)

This repo contains the personal website of Brad McGonigle that is built with [Gatsby](https://www.gatsbyjs.org/) and [Bulma](http://bulma.io) running on [Netlify](https://netlify.com).

It follows the [JAMstack architecture](https://jamstack.org) by using Git as a single source of truth, and [Netlify](https://www.netlify.com) for continuous deployment and CDN distribution.

## Prerequisites

- Node (v8.2.0 or higher _recommended_)
- [Gatsby CLI](https://www.gatsbyjs.org/docs/)

### Access Locally

```
$ git clone https://github.com/bradmcgongile/bradmcgongile.git
$ cd [REPO_NAME]
$ yarn
$ yarn develop
```

## Getting Started (Without Netlify)

```
$ gatsby new [SITE_DIRECTORY_NAME] https://github.com/bradmcgongile/bradmcgongile/
$ cd [SITE_DIRECTORY_NAME]
$ yarn build
$ yarn serve
```

## Debugging

Windows users might encounter `node-gyp` errors when trying to npm install.
To resolve, make sure that you have both Python 2.7 and the Visual C++ build environment installed.

```
npm config set python python2.7
npm install --global --production windows-build-tools
```

[Full details here](https://www.npmjs.com/package/node-gyp 'NPM node-gyp page')
