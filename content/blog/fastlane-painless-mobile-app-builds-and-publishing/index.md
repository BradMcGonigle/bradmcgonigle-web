---
templateKey: blog-post
path: /blog/fastlane-painless-mobile-app-builds-and-publishing
category: Development
title: >-
  Fastlane: Painless Mobile App Builds and Publishing
date: 2019-08-19T16:50:29-04:00
description: >-
  Getting from idea to released app is a long process. As developers, our focus should remain on code and user experience. Releasing a mobile app requires so much more, from screenshot generation to code signing to app store deployments, developing and releasing a mobile app can be a tedious process which Fastlane helps make easier.
featuredImage: shipping-container-yard.jpg
featuredImageAlt: Shipping Containers
image:
imageAlt:
tags:
  - Development
  - Apps
  - iOS
  - Android
  - React Native
---

When I first got started with [React Native][react-native], I hoped to focus on learning the intricacies of developing cross-platform apps using my existing knowledge of React and not deal with the headaches I had previously experienced around provisioning profiles, certificates and code signing. Not long into one of my first projects, I discovered [fastlane][fastlane], a way to automate the development and release process for mobile apps.

> _fastlane_ is the easiest way to automate beta deployments and releases for your iOS and Android apps. 🚀 It handles all tedious tasks, like generating screenshots, dealing with code signing, and releasing your application.

Currently, I'm using [fastlane][fastlane] for code signing and deployment so that is what will be covered in this post but I encourage you to checkout [fastlane's available actions][actions] to see what else it can automate for you.

## Getting Started with Fastlane

First we need to get [fastlane][fastlane] installed. However, we need to first install the latest Xcode command line tools if they are not already installed.

```bash
$ xcode-select --install
```

Next, let's install [fastlane][fastlane] via [homebrew](https://brew.sh).

```bash
$ brew cask install fastlane
```

Once installed, we need to create a `fastlane` folder inside out [React Native][react-native] project root. Next, create an empty file called `Fastfile`. _Alternatively, there is a `fastlane init` command that can used to handle some of the scaffolding._ Our `Fastfile` will consist of all of our _lanes_ which contain [fastlane actions][actions] that execute synchronously to automate our processes.

```ruby
fastlane_version '2.129.0'

before_all do
  ensure_git_branch
  ensure_git_status_clean
  git_pull
end

platform :ios do
  # iOS specific lanes
end

platform :android do
  # Android specific lanes
end
```

Our `Fastfile` starts with a `before_all` hook to ensure our repository has the latest code from our `master` branch and is _clean_ so we don't deploy unfinished code. Next we define the platforms for which we are doing to later provide _lanes_. By defining our platforms individually, we are able to execute builds and deployments for each platform individually.

## iOS and the App Store

Let's start with iOS and our first _lane_ which will fetch our App Store certificates and provisioning profiles. We are going to use [_match_][match] to easily sync our certificates and profiles, allowing us to share one code signing identity across our entire development team.

> _match_ creates all required certificates & provisioning profiles and stores them in a separate git repository. Every team member with access to the repo can use those credentials for code signing. match also automatically repairs broken and expired credentials. It's the easiest way to share signing credentials across teams

Before creating our _lanes_, we need to setup [_match_][match] in our project and provide it with the URL to our _**private**_ Git repo which will hold our code signing identities. _**Remember, code signing identities *SHOULD ALWAYS* be kept private.**_

```bash
$ fastlane match init
```

This will create a `Matchfile` in our `fastlane` directory within our project root and will be used anytime we use a _match_ action in our _lanes_. Now let's setup our first _lane_ to fetch our certificates and provisioning files using our `Matchfile` settings. Each _lane_ should be proceeded by a description using `desc` that clearly describes purpose of the _lane_. Next we define the name of our _lane_ and provide it with the actions it should execute.

```ruby
platform :ios do
  desc 'Fetch certificates and provisioning profiles'
  lane :certificates do
   match(app_identifier: 'com.bundle.identifier', type: 'development', readonly: true)
   match(app_identifier: 'com.bundle.identifier', type: 'appstore', readonly: true)
  end
end
```

Now we can run `fastlane ios certificates` to automatically save our provisioning profiles and certificate to our macOS keychain for future use. We are now also able to use our `certificates` lane as an action in our other iOS-specific lanes. Our next step is to create a _lane_ for building our iOS app and another one for shipping our app to Testflight.

```ruby
platform :ios do
  desc 'Fetch certificates and provisioning profiles'
  lane :certificates do
   match(app_identifier: 'com.bundle.identifier', type: 'development', readonly: true)
   match(app_identifier: 'com.bundle.identifier', type: 'appstore', readonly: true)
  end

  desc 'Build the iOS application.'
  private_lane :build do
    certificates
    increment_build_number(xcodeproj: './ios/AppName.xcodeproj')
    gym(scheme: 'AppName', project: './ios/AppName.xcodeproj')
  end

  desc 'Ship to Testflight.'
  lane :beta do
    build
    pilot
    commit_version_bump(message: 'Bump build', xcodeproj: './ios/AppName.xcodeproj')
    push_to_git_remote
  end
end
```

Let's break our two new _lanes_ down a bit and start with our build _lane_. We are using a `private_lane` block since it doesn't make sense to execute a build directly from the command line using `fastlane build`. Inside our build block will call our `certificates` lane and execute it before we automatically increment our app build number in Xcode and then build our app using [_gym_][gym].

Now we have all the pieces in place to ship our app to Testflight using our beta _lane_. When we run `fastlane ios beta`, fastlane executes our build _lane_ to build our signed app `.ipa` bundle. We then use [pilot]([pilot] to upload our local build to Testflight. Finally, we also create a new commit in our repo for the build number bump and push that to our Git remote automatically.

## Android and the Google Play Store

Similar to our iOS-specific lanes, we need to provide a few Android-specific lanes to build and deploy our app to the Google Play Store. Unlike iOS, we don't need to create a specific code signing lane since our Android app will be signed during an _assemble_ task in our build action. This does however assume that we have already setup app signing for our app in the Google Play store. I followed [the guide provide by Facebook in the React Native docs](https://facebook.github.io/react-native/docs/signed-apk-android.html) before proceeding.

```ruby
platform :android do
  desc 'Build the Android application.'
  private_lane :build do
    gradle(task: 'clean', project_dir: 'android/')
    gradle(task: 'assemble', build_type: 'Release', project_dir: 'android/')
  end
end
```

Our build _lane_ has two [_gradle_][gradle] actions, the first of which cleans our `android` directory before we move on actually building our app using _assemble_. With our build _lane_ complete, we'll now create _lanes_ for the release tracks on the Google Play Store.

```ruby
platform :android do
  desc 'Build the Android application.'
  private_lane :build do
    gradle(task: 'clean', project_dir: 'android/')
    gradle(task: 'assemble', build_type: 'Release', project_dir: 'android/')
  end

  desc 'Ship to Play Store Beta.'
  lane :beta do
    build
    supply(track: 'beta', track_promote_to: 'beta')
    git_commit(path: ['./android/gradle.properties'], message: 'Bump versionCode')
    push_to_git_remote
  end

  desc 'Ship to Play Store Alpha.'
  lane :alpha do
    build
    supply(track: 'alpha', track_promote_to: 'alpha')
    git_commit(path: ['./android/gradle.properties'], message: 'Bump versionCode')
    push_to_git_remote
  end

  desc 'Ship to Play Store Internal.'
  lane :internal do
    build
    supply(track: 'internal', track_promote_to: 'internal')
    git_commit(path: ['./android/gradle.properties'], message: 'Bump versionCode', allow_nothing_to_commit: true)
    push_to_git_remote
  end
end
```

We now have three _lanes_ for each release track. Using `fastlane android OUR_LANE_NAME`, each _lane_ calls our `build` _lane_, uses [_supply_][supply] to upload that build to the defined Google Play Store track, bumps our app `versionCode` and pushes that bump to our Git repo.

Depending on your release flow, you may only ever use the `internal` track _lane_ and from there use the Google Play Console to promote the releases up to the Alpha and Beta tracks before releasing it to the public. However, it's nice to have the other _lanes_ available if there is ever the need to ship directly to a specific track.

## Fastlane to the Rescue

[Fastlane][fastlane] has saved my sanity when dealing with code signing and app store deployments for my React Native projects. In a team environment, it's a no brainer to use [fastlane][fastlane] actions like [_match_][match] to share certificates and provisioning profiles. Beyond building, code signing and deployment, [fastlane][fastlane] has a slew of [available actions][actions] that can automate your development flow process even more. Whether it's running tests, generating app screenshots, creating automatic documentation or just sending an automated Slack message to the rest of your team that a new build is available, [fastlane][fastlane] can help automate all of those processes.

[react-native]: https://facebook.github.io/react-native/
[fastlane]: https://docs.fastlane.tools/
[actions]: https://docs.fastlane.tools/actions/
[gradle]: https://docs.fastlane.tools/actions/gradle/
[gym]: https://docs.fastlane.tools/actions/gym/
[pilot]: https://docs.fastlane.tools/actions/pilot/
[match]: https://docs.fastlane.tools/actions/match/
[supply]: https://docs.fastlane.tools/actions/supply
