---
templateKey: 'blog-post'
path: /blog/using-bulma-with-react
category: Development
title: >-
  Using Bulma with react
date: 2019-05-10T10:00:00.000Z
description: >-
  CSS frameworks are nothing new and Bulma has become one of the popular choices for rapid frontend prototyping and development. Like most CSS frameworks, though, class fatigue quickly becomes an issue when trying to maintain clear and concise code. Every React developer trying to use CSS frameworks has dealt comical className properties on a single element. Instead, why not integrate the CSS framework directly into React so we can more easily take advantage of everything Bulma has to offer.
featuredImage: 2019-05-10-using-bulma-with-react.jpg
featuredImageAlt: >-
  CSS Code
image:
imageAlt:
tags:
  - React
  - CSS
  - Frameworks
---

There are few choices when integrating Bulma into React but my favorite is [react-bulma-components](https://github.com/couds/react-bulma-components). It’s well documented, supports all of [Bulma](https://bulma.io/)’s features and releases typically come quickly after official Bulma releases.

### Getting Started
First we need to add [react-bulma-components](https://github.com/couds/react-bulma-components) to our React project.

#### NPM
`npm install react-bulma-components`

#### Yarn
`yarn add react-bulma-components`

Next, let’s import a Bulma component. We’re going start with the `Button` component as our first example because it's one of the simplest but is also a great example of the power of  [Bulma](https://bulma.io/) and [react-bulma-components](https://github.com/couds/react-bulma-components).

```javascript
import { Button } from "react-bulma-components";
```

As one would expect the `Button` component renders a html  `<Button>` . Looking at the [Bulma docs for buttons](https://bulma.io/documentation/elements/button/), lets see how we can change the color, size and style of our button. As a typical css framework, we would normally pass the Bulma-specific classes to our elements to take advantage of Bulma’s styling properties. That method will work just fine with [react-bulma-components](https://github.com/couds/react-bulma-components) but there is a better way &mdash; props!

```javascript
<Button color="info" outlined rounded size="large">Our Button</Button>
```

Let's see the what the outputted html looks like now.

```javascript
<button class="is-info is-outlined is-rounded is-large">Our Button</Button>
```

Like many of the components in [react-bulma-components](https://github.com/couds/react-bulma-components) the button component also accepts a `renderAs` property which allows you to pass an html tag to change the element type our component will be rendered as. Maybe we want all the styles of a button but want to use it as a link.

```javascript
<Button renderAs”a” href="#" color="info" outlined rounded size="large">Our Button</Button>
```

Passing `renderAs=“a”`  along with a `href`  will make our button markup render as a link.

```javascript
<a href="#" class="button is-info is-outlined is-rounded is-large">Our Button</a>
```

With [react-bulma-components](https://github.com/couds/react-bulma-components), all of our Bulma components can accept whatever props you want including `className` which will be prepended to any of the classes derived from the other props passed to our component.

### Bulma's Grid

Bulma is dubbed _CSS framework based on Flexbox_ so at its core, one of its most powerful uses is for simplifying layouts. [Columns](https://bulma.io/documentation/columns/) are Bulma’s building blocks for creating responsive layouts that just work.  Bulma uses a 12 column layout but has the flexibility to work with fixed width columns as well as percentage-based columns. A basic fixed-width column in Bulma might looks like `<div class=“column is-6">Column Content</div>` where `is-6` defines the size of the column based on it's container size.  If we wanted our column to be percentage-based, instead of using the  `is-6`  class we would use `is-half`.   Since Bulma uses flexbox at it's core, for a two column layout we technically only need to define the size of our first column.  Based on the first columns size setting, our second column will automatically adjust to take up the remaining container.   The html looks like this.

```html
<div class="container">
	<div class="is-one-fifth">20% width of the container</div>
	<div>80% width of the container</div>
</div>
```

Of course, [react-bulma-components](https://github.com/couds/react-bulma-components) also includes components for columns.  Let's take a look.

```javascript
import { Columns, Container } from "react-bulma-components";
```

```javascript
<Container>
	<Columns>
		<Columns.Column size="one-fifth">20% width of container</Columns.Column>
		<Columns.Column>80%  width of container</Columns.Column>
	</Columns>
</Container>
```

The component above will render the  same html above.

### Plenty More to Explore
Of course, Bulma offers so much more than button styling and grid layout.  There are styles for easily implementing navigation bars, breadcrumbs, tags, cards, forms, and so much more that all are available in [react-bulma-components](https://github.com/couds/react-bulma-components).  I encourage you to check out the [bulma docs](https://bulma.io/documentation/) as well as their [showcase](https://bulma.io/expo/) which can give you an idea of the possibilities with Bulma with or with React.

If you are using React, [react-bulma-components](https://github.com/couds/react-bulma-components)  gives us a way to implement the Bulma CSS framework in a clean way without having to dirty our React component code with extraneously long `className` props.  If you're thinking about using Bulma with React, do yourself a favor and start with [react-bulma-components](https://github.com/couds/react-bulma-components).
