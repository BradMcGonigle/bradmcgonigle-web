import React from 'react'
import Img from 'gatsby-image'
import { Card, Heading } from 'react-bulma-components'

const BlogPostTeaseCard = ({ small, post }) => (
  <Card renderAs="a" href={post.frontmatter.path} className="no-border">
    {!post.frontmatter.featuredImage && post.frontmatter.image && (
      <Img
        fluid={post.frontmatter.image.childImageSharp.fluid}
        alt={post.frontmatter.imageAlt}
        className="card-image"
      />
    )}
    {post.frontmatter.featuredImage && !post.frontmatter.image && (
      <Img
        fluid={post.frontmatter.featuredImage.childImageSharp.fluid}
        alt={post.frontmatter.featuredImageAlt}
        className="card-image"
      />
    )}
    <Card.Content>
      <Heading renderAs="h5" size={6} subtitle className="has-text-grey-light">
        {post.frontmatter.date} &mdash; {post.fields.readingTime.text}
      </Heading>
      <Heading renderAs="h2" size={3}>
        {post.frontmatter.title}
      </Heading>
      <Heading
        renderAs="h4"
        size={5}
        subtitle
        className="has-text-weight-light has-text-grey margin-bottom-025"
      >
        {post.frontmatter.description}
      </Heading>
    </Card.Content>
  </Card>
)

export default BlogPostTeaseCard
