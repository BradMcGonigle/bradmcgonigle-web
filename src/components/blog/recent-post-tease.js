import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { Card, Heading } from 'react-bulma-components'

const BlogRecentPostTease = ({ small, post }) => (
  <Link to={post.frontmatter.path}>
    <Card className="no-border">
      {post.frontmatter.image &&
        <Img fluid={post.frontmatter.image.childImageSharp.fluid} alt={post.frontmatter.image} className="card-image" />
      }
      <Card.Content>
        <Heading renderAs="h2" size={3}>{post.frontmatter.title}</Heading>
        <Heading renderAs="h4" size={5} subtitle className="has-text-grey margin-bottom-025">{post.frontmatter.description}</Heading>
        <Heading renderAs="h5" size={6} subtitle className="has-text-grey-light">
          {post.frontmatter.date} &mdash; {post.fields.readingTime.text}
        </Heading>
      </Card.Content>
    </Card>
  </Link>
)

export default BlogRecentPostTease
