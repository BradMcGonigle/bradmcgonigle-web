---
templateKey: blog-post
path: /blog/github-action-for-continuous-deployment
category: Development
title: >-
  GitHub Actions for Continuous Deployment
date: 2019-12-13T22:58:54-08:00
description: >-
  GitHub Actions are a powerful tool to create custom software development life cycle workflows from directly in your GitHub repositories. I've moved from CircleCI for my continuous deployment needs and leveraged GitHub Actions as a seamless replacement for deploying directly to Netlify every time commits are made.
featuredImage:
featuredImageAlt:
image: github-actions.png
imageAlt: >-
  Github Actions
tags:
  - Development
  - Github
  - Deployment
  - Automation
---

I've always been a proponent of automating as many of my workflows as possible.  I wrote a blog post about [deploying to Netlify via CircleCI](/blog/deploying-to-netlify-via-circleci), detailing my first continuous deployment setup for this site.  CircleCI has been flawless and while this site isn't huge, it's now up to just shy of 300 pages but with around 3600 Gatsby generated images which has recently been causing build timeouts on my free CircleCI plan. Luckily, around the time I started hitting these limits, GitHub opened up access to GitHub Actions.  

> GitHub Actions enables you to create custom software development life cycle (SDLC) workflows directly in your GitHub repository.

I've transitioned from CircleCI to Github for building and deploying to Netlify which so far has been rock solid.  Similar to CircleCI and many other CI/CD platforms, GitHub Actions uses `yaml` config files to create what GitHub calls Workflows.  A Workflow is a configurable automated process made up of one or more jobs.  For my use, I have two almost identical workflows, one for production deployments and one for deploy previews to Netlify for any pull requests on my repo.

The workflow files themselves are pretty simple, containing a single job with multiple steps to handle repo checkout, environment setup, installation of dependencies, building the Gatsby site and deploying it to Netlify.

Let's take a look at my deploy to production file which will be run anytime there are changes to `master` or `release.`

```yaml
name: Deploy

on:
  push:
    branches:
      - master
      - release/*
```

_For preview deploys of pull requests, the only differences is changing the `name` of the workflow and the `on` trigger to `on: pull_request` which tiggers the action for all pull requests on the repository._

Next we define our jobs. For my simple deployment action I only have one job called 'build'. There is some basic environment definitions to use the latest version of ubuntu and set the desired node to the latest release of version 12 which are later references in the jobs' steps.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [12.x]
```

Continuing on, I define the jobs' steps with the first two steps leveraging first party GitHub Actions.  First, [checked out the repo](https://github.com/actions/checkout) on the newly created environment and then [set up node](https://github.com/actions/setup-node) on that environment.  Once node is setup, the next steps are to install dependencies and to create a build of the Gatsby site.

```yaml
    steps:
      - uses: actions/checkout@v1
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - name: Install dependencies
        run: |
          npm install
      - name: Build
        run: |
          npm run build --if-present
```

Once the site is built, I automatically deploy that build to Netlify.  Netlify has put together their own [GitHub actions](https://github.com/netlify/actions/), [one of which](https://github.com/netlify/actions/tree/master/cli) exposes all the functionality of [Netlify CLI](https://github.com/netlify/cli) within the context of Actions.  In order to deploy to Netlify, I set two secrets within the GitHub repository settings. `NETLIFY_SITE_ID` can be found in the Netlify Dashboard site settings. `NETLIFY_AUTH_TOKEN` is a Netlify personal access token can be created in the [Netlify user dashboard](https://app.netlify.com/user/applications?_ga=2.73550869.644955161.1576300599-5758415.1576300599#personal-access-tokens)

```yaml
    steps:
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --site ${{ secrets.NETLIFY_SITE_ID }} --auth ${{ secrets.NETLIFY_AUTH_TOKEN }} --prod --dir=public
        env:
          CD: true
```

Finally, combine all the pieces and the final file workflow looks like this.

```yaml
name: Deploy

on:
  push:
    branches:
      - master
      - release/*

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [12.x]

    steps:
      - uses: actions/checkout@v1
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - name: Install dependencies
        run: |
          npm install
      - name: Build
        run: |
          npm run build --if-present
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --site ${{ secrets.NETLIFY_SITE_ID }} --auth ${{ secrets.NETLIFY_AUTH_TOKEN }} --prod --dir=public
        env:
          CD: true
```

While CircleCI initially worked great for my needs, as my site has begun to grow, I quickly realized I was bound hit the usage limits of their free accounts. GitHub Actions also has [usage limits](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/about-github-actions#usage-limits) but they are extremely generous even for free accounts.  We'll see if those limit change as the service becomes more and more popular but only time will tell.
