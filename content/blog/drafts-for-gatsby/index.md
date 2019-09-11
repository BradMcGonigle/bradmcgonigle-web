---
templateKey: blog-post
path: /blog/drafts-for-gatsby
category: Gatsby
title: >-
  Drafts for Gatsby
date: 2019-09-10T14:09:32-04:00
description: >-
  Draft functionality is common place in content management systems but implementing them in simple Gatsby sites always seemed a bit hacky. Now, using Gatsby's Schema Customization API, implementing drafts functionality for content is painless and straightforward.
featuredImage: pencils.jpg
featuredImageAlt: Number 2 Pencils
image:
imageAlt:
tags:
  - GatsbyJS
---

Since creating my Gatsby site, I've wanted to add drafts functionality for my blog posts and while possible, the solutions all seemed less than ideal.  Luckily, as of Gatsby 2.2.0 that all changed with the new [Schema Customization API](https://www.gatsbyjs.org/blog/2019-03-18-releasing-new-schema-customization/). Let's take a look at how easy it is to add drafts functionality to our markdown content.

### gatsby-node.js changes

Initially, I thought it would make sense to add a new `draft` field in the frontmatter of all of my markdown files but if you have a large site already that can be a pain.  Instead, there is a better way!.  We can set a default value for a `draft` field so that we will only need to add `draft: true` to any markdown files we want to designate as drafts.

```javascript
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes, createFieldExtension } = actions

  createFieldExtension({
    name: `defaultFalse`,
    extend() {
      return {
        resolve(source, args, context, info) {
          if (source[info.fieldName] == null) {
            return false
          }
          return source[info.fieldName]
        },
      }
    },
  })

  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      draft: Boolean @defaultFalse
    }
  `)
}
```

Let's break down the code above by understanding the [`createTypes`](https://www.gatsbyjs.org/blog/2019-03-18-releasing-new-schema-customization/#createtypes) function.

> createTypes can be used to define, fix, or extend a Gatsby GraphQL type that represents some of your app’s data. Think of it like an escape hatch to politely inform Gatsby of your data’s shape.

In addition to using `createTypes`, we'll define a [nested type](https://www.gatsbyjs.org/docs/schema-customization/#nested-types) on the MarkdownRemark type so we can define our new `draft` field to be of type boolean. With out type set, we'll now create a directive which we will call `@defaultFalse`.  This directive comes from our [`createFieldExtension`](https://www.gatsbyjs.org/docs/schema-customization/#creating-custom-extensions) action which allows us to define the default draft status for our content. In our case, we want to default the draft status of our content to `false`, hence the name of our directive `defaultFalse`. After setting the name of our field extension, we then extend our MarkdownRemark implementation to check each frontmatter field within our markdown files and return it's value.

In our `resolve`, the `source` variable contains each of our frontmatter fields with `info.fieldName` representing the name of the field.  Any fields that are not provided in the frontmatter will have a default value of `null`. Since our `draft` field will only be present when we want to designate a post as a draft, we return `false` if the `draft` field is not present. For all of our other fields, we will simply return the value of each field.

### Setting Draft Status

Now that we have our `draft` functionality defined to work in cases where the field is provided and even when it is not, let's put it to use.

```yaml
---
title: Working Title  
date: 2019-09-10T14:09:32-04:00
draft: true
---
```

By only adding `draft: true` in our frontmatter and updating our GraphQL queries to use the `drafts` field, we can filter out all content with `draft: true` set in the frontmatter.  Our GraphQL query might look something like:

```graphql
query {
  allMarkdownRemark(filter: {frontmatter: {draft: {eq: false}}}) {
    nodes {
      frontmatter {
        title
        date
      }
    }
  }
}
```

Our query will now only return markdown content which does not have a field called `draft` set to true.

If you're like me, writing blog posts can be a slow process and having the ability to use drafts is vital for my workflow without compromising the ability to continuously deploy the site for other content updates. It also allows me to use git as a history for my blog post revisions before they are set to be published to my site.
