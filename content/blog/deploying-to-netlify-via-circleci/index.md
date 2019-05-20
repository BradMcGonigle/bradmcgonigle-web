---
templateKey: blog-post
path: /blog/deploying-to-netlify-via-circleci
category: Development
title: >-
  Deploying to Netlify via CircleCi
date: 2019-05-11T10:00:00.000Z
description: >-
  Netlify is my go to option for deploying static websites but there is usually one sticking point, especially when working with static site generators - slow build times!
featuredImage:
featuredImageAlt:
image: circleci-dashboard-setup.png
imageAlt: >-
  CircleCI Dashboard
tags:
  - Netlify
  - GatsbyJS
  - JAMstack
---

Deploying a static website using Netlify is dead simple. They offer continuous deployment by connecting a Git repo to a Netlify site just with almost zero configuration. Using a static site generator like GatsbyJs is almost equally as simple. Add a build command to in a site’s deploy settings and Netlify will execute that command on each push to the repo's production branch _(typically `master`)_. They even offer to continuously deploy all branches or only specified branches which will run the build command and provide a preview url to preview that branch. Netlify is incredible, I could go on singing it's praises but for now I’ll save that for another post.

For now I want to focus on one issue I've run into time and time again &mdash; build timeouts. Netlify enforces a 15 minute time limit for builds which can be easy to hit as your static generated sites grow.

Slow build times can stem from many things but with GatsbyJS it's usually image processing that's the culprit. Gatsby makes it incredibly simple to optimize images but doing so can come at a cost.

This site uses the `gatsby-image` plugin combined with `gatsby-plugin-sharp` and `gatsby-transformer-sharp` to process all the images into multiple sizes and resolutions to serve the optimal image based on device size and screen resolution. I won’t cover that setup here but Gatsby provides a [helpful doc](https://www.gatsbyjs.org/docs/working-with-images/) that can get you started. While using responsive image sets provides obvious benefits, it means that Gatsby needs to generate a minimum of two _(but usually many more)_ different sized images for each image on the site at build time. As you can imagine, processing so many images can quickly become taxing on even modern machines.

### Caching the Netlify cache

My first attempt to solve my build timeout woes was to the implement [`gatsby-plugin-netlify-cache`](https://www.npmjs.com/package/gatsby-plugin-netlify-cache) plugin.

When running `gatsby build`, a `.cache` folder is created to cache the build files and once complete those files are placed into the `public` folder to then be served. Since Netlify uses docker containers for each deploy those containers do it persist, only dependencies are cached between builds. However, there is an [undocumented shared folder](https://www.contentful.com/blog/2018/05/17/faster-static-site-builds-part-one-process-only-what-you-need/#caching-for-the-win) which `gatsby-plugin-netlify-cache` uses to restore the Gatsby cache between builds.

At first this caching method worked great and took my builds from around the 15 minute limit down to around 7 minutes. Great, problem solved right? Almost but not quite. Once, I needed to do a 'clear cache and deploy site' and I was right back to my builds timing out. I needed another solution and using CircleCI became exactly that.

### Building with CircleCI

Similar to Netlify's continuous deployment flow, CircleCI directly integrates with a Git repo and creates a build for every commit to the `master` branch. After a successful build, I can use [netlify-cli](https://www.npmjs.com/package/netlify-cli) to deploy those builds directly to my Netlify production site. Let’s walk though my setup.

#### Setup

Since I use Github, the initial setup was easy. CircleCI uses a [`YAML` config file](https://circleci.com/docs/2.0/getting-started/#adding-a-yml-file) within a `.circleci` folder at the root of your repo which instructs CircleCI how to build your project. There are a ton of [configuration options](https://circleci.com/docs/2.0/configuration-reference/) but for the initial setup I stuck with their example `config.yml` file.

```yaml
version: 2
 jobs:
   build:
     docker:
       - image: circleci/ruby:2.4.1
     steps:
       - checkout
       - run: echo "A first hello"
```

Once created, I added a CircleCI project for my repo in the CircleCI dashboard by clicking the 'Set Up Project' button next to the repo name.

My first build was running! Now, for the real fun &mdash; creating a real config to build my GatsbyJS site. There are a lot of [configuration options](https://circleci.com/docs/2.0/configuration-reference/) available but I’ll cover just the ones I use.

First, I set CircleCI to use the latest version `2.1` and a pre-build docker container with node 10 installed

```yaml
version: 2.1
executors:
  node-executor:
    docker:
      - image: circleci/node:10
```

Next I need to creat commands that instruct CircleCI exactly what to execute each time I build my site.

```yaml
commands:
  gatsby-build:
    steps:
      - checkout
      - restore_cache:
          keys:
            - yarn-cache-{{ checksum "yarn.lock" }}
      - run:
          name: Install Dependencies
          command: yarn install && npm rebuild
      - save_cache:
          key: yarn-cache-{{ checksum "yarn.lock" }}
          paths:
            - ./node_modules
      - restore_cache:
          keys:
            - gatsby-public-cache-{{ .Branch }}
      - run:
          name: Gatsby Build
          command: GATSBY_CPU_COUNT=2 yarn build
      - save_cache:
          key: gatsby-public-cache-{{ .Branch }}
          paths:
            - ./public
```

My build command is called `gatsby-build` which is followed by a series of steps CircleCI will execute.

1. `checkout` - the git repo is checked out from GitHub.
2. `restore_cache` - checks to see if there is a cache of our `./node_modules` folder from a previous build. I assign an identifier (`key` in CircleCI terms) to the cache upon creation which uniquely identifies the cache based on the `checksum` of my `yarn.lock` file which is set later in step 4 when `save_cache` is tan. If our `yarn.lock` file changes between builds, the `checksum` will not match and CircleCI will skip the restore and proceed to the next step.
3. `run` - here CircleCI will execute the `yarn install && npm rebuild` command. _(I run `npm rebuild` specifically to fix an issue with the `sharp` dependency not compiling properly when run by `yarn install`)_
4. `save_cache` - once the dependencies are installed the `./node_modules` directory is cached for use in future builds by step 2.
5. `restore_cache` - this is similar to our `./node_modules` cache but this time I cache the Gatsby `public` directory and look for a `key` which ends with the branch name that is being built. Since I build all branches and not only build my `master` branch, this will distinguish between branch builds to ensure the correct cache is restored in future builds.
6. `run` - this runs our build command. I use `yarn build` which in I use to execute Gatsby’s build command, `gatsby build`.
7. `save_cache` - upon successful build, this creates a cache of the Gatsby `public` folder which is restored in step 5 during subsequent builds.

As I said, I run builds for each branch on my repo and not just master so in order to ensure a branch build does not get deployed to production, I setup two separate workflows.

```yaml
workflows:
  version: 2
  build-deploy:
    jobs:
      - build:
          filters:
            branches:
              ignore:
                - master
      - release:
          filters:
            branches:
              only:
                - master
```

The first workflow runs the `build` job for all branches that are not `master`. The second workflow runs the `release` job which builds only the `master` branch. The jobs that at run by these workflows are the last piece of my config.

```yaml
jobs:
  build:
    executor: node-executor
    environment:
      NETLIFY_SITE_ID: YOUR_NETLIFY_SITE_ID
      NETLIFY_ACCESS_TOKEN: A_NETLIFY_ACCESS_TOKEN
    working_directory: ~/repo
    steps:
      - gatsby-build
      - run:
          name: Netlify Deploy
          command: ./node_modules/.bin/netlify deploy --site $NETLIFY_SITE_ID --auth $NETLIFY_ACCESS_TOKEN --dir=public
  release:
    executor: node-executor
    environment:
      NETLIFY_SITE_ID: YOUR_NETLIFY_SITE_ID
      NETLIFY_ACCESS_TOKEN: A_NETLIFY_ACCESS_TOKEN    working_directory: ~/repo
    steps:
      - gatsby-build
      - run:
          name: Netlify Deploy
          command: ./node_modules/.bin/netlify deploy --site $NETLIFY_SITE_ID --auth $NETLIFY_ACCESS_TOKEN --prod --dir=public
```

Both jobs are identical with the exception of one key flag set on the Netlify CLI `deploy` command. For the release job, I set the `--prod` flag on the `netlify deploy` command which tells Netlify to deploy the build to production which is set to auto-publish in by Netlify sites’ deploy settings.

However, in order to deploy to Netlify, I need to set two environment variables which will be passed as flags to our `netlify deploy` command. The first is the site ID (`NETLIFY_SITE_ID` in my config) for our Netlify site. The easiest way to get this id is to run `netlify sites` command on your local machine with Netlify CLI installed. This will print out a list of all your Netlify sites along with their unique site IDs. Next, we need an access token (NETLIFY_ACCESS_TOKEN`in my config) which will authorize CircleCI to deploy our build directly to Netlify servers. With our two environment variables now set, our`netlify deploy` command should run smoothly.

Putting my entire CircleCI configuration options together ends up looks like this.

```yaml
version: 2.1
executors:
  node-executor:
    docker:
      - image: circleci/node:10
commands:
  gatsby-build:
    steps:
      - checkout
      - restore_cache:
          keys:
            - yarn-cache-{{ checksum "yarn.lock" }}
      - run:
          name: Install Dependencies
          command: yarn install && npm rebuild
      - save_cache:
          key: yarn-cache-{{ checksum "yarn.lock" }}
          paths:
            - ./node_modules
      - restore_cache:
          keys:
            - gatsby-public-cache-{{ .Branch }}
      - run:
          name: Gatsby Build
          command: GATSBY_CPU_COUNT=2 yarn build
      - save_cache:
          key: gatsby-public-cache-{{ .Branch }}
          paths:
            - ./public
workflows:
  version: 2
  build-deploy:
    jobs:
      - build:
          filters:
            branches:
              ignore:
                - master
      - release:
          filters:
            branches:
              only:
                - master
jobs:
  build:
    executor: node-executor
    environment:
      NETLIFY_SITE_ID: YOUR_NETLIFY_SITE_ID
      NETLIFY_ACCESS_TOKEN: A_NETLIFY_ACCESS_TOKEN
    working_directory: ~/repo
    steps:
      - gatsby-build
      - run:
          name: Netlify Deploy
          command: ./node_modules/.bin/netlify deploy --site $NETLIFY_SITE_ID --auth $NETLIFY_ACCESS_TOKEN --dir=public
  release:
    executor: node-executor
    environment:
      NETLIFY_SITE_ID: YOUR_NETLIFY_SITE_ID
      NETLIFY_ACCESS_TOKEN: A_NETLIFY_ACCESS_TOKEN    working_directory: ~/repo
    steps:
      - gatsby-build
      - run:
          name: Netlify Deploy
          command: ./node_modules/.bin/netlify deploy --site $NETLIFY_SITE_ID --auth $NETLIFY_ACCESS_TOKEN --prod --dir=public
```

### Fast and Successful Builds

Using CircleCI and the configuration above to handle my GatsbyJS builds _(sans tests because **tisk, tisk** I have none at the moment)_, took my 15+ minute build times down to around 4 minutes including deployment. Saving time is one thing but having builds finish each and every time I run them is the real improvement to my deployment flow.

The only potential ‘gotcha’ with CircleCI is that free accounts only get 1000 build minutes per month. At my current 4 minute build time, that's around 250 builds per month which I’d say is pretty generous. However, if your repo is open source _(which this site will be soon after some cleanup)_ then CircleCI is completely free with unlimited builds.

While Netlify’s ability to handle continuous deployments is great for small static sites, my GatsbyJS site quickly outgrew their limits causing failed build after failed build. Moving to CircleCI for my builds and using Netlify CLI to deploy those builds from CircleCI has alleviated my deployment anxiety and let me get back to what I like, writing code.
