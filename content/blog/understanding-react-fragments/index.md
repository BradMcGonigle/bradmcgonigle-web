---
templateKey: blog-post
path: /blog/understanding-react-fragments
category: Development
title: >-
  Understanding React Fragments
date: 2019-05-22T22:36:08-04:00
description: >-
  The days of wrapping component's return children in React with unnecessary elements are long behind us.
featuredImage: glass-fragments.jpg
featuredImageAlt: >-
  Shattered Glass Fragments
image:
imageAlt:
tags:
  - Development
  - React
---

For anyone that started using React prior to version 16.2, the need to wrap elements with useless `<divs>` or `spans` was enough to endure markup nausea. Thankfully, those days are long behind us with the help of Fragments. If you aren't using Fragments _(tisk tisk - they've been available for 2017)_, you should to be. Put simply, Fragments let us return multiple children elements without adding frivolous nodes to the DOM. Really, that’s all they do!

Let’s look at a simple example of how a component’s `return` might have looked prior to React version 16.2.

```jsx
class Parent extends React.Component {
  render() {
    return (
      <div>
        <Child />
        <Child />
      </div>
    )
  }
}
```

Our Parent component above directly returns multiple Child components so we need to wrap those children in a extraneous `div` tag _(or other valid tag)_ in order for our return to be valid.

Let’s take the same example and see how we’d use Fragments to improve the rendered HTML.

```jsx
class Parent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Child />
        <Child />
      </React.Fragment>
    )
  }
}
```

By just replacing our wrapper `div` with `React.Fragment` (or even `<>` and `</>`), our Parent component will return the Child component directly to the DOM without any wrapping nodes.

## Accepted Attributes

Fragments are simple and so are the attributes they accept because there is only one, the `keys` attribute. This is handy when we need to map a collection to an array of fragments like items in a list. There is some discussion around adding additional accepted attributes, event handlers for instance, but for now the React team is keeping it simple.

## Why Fragments Matter

Aside from cleaner markup in the DOM, having less nodes uses less memory and results in faster rendering. However, for _normal_ size DOM trees, these benefits are largely unnoticeable.

Developers, though, will appreciate a cleaner, flatter DOM. Inspecting DOM elements with multiple wrapping nodes is just annoying and Fragments helps remove the bloat from our inspectors.

However, the most direct benefit is for those times when our styles require special parent-child relationships. Take flexbox or css grid for example. Having extra divs can greatly change our layout pattern and complicate the logic needed to achieve our desired layout. Using Fragments eliminates those issues.

## Simple is Good

That's really all there is to Fragments. They are purposely simple and there is no excuse for any project on React v16.2 or greater to not be using them wherever needed.
