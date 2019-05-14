import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { Button, Card, Heading } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/pro-light-svg-icons'

const BlogFeaturedPostTease = ({ post }) => (
  <Link to={post.frontmatter.path}>
    <Card className="no-border horizontal-card is-flex-tablet">
      {post.frontmatter.featuredImage &&
        <Img fluid={post.frontmatter.featuredImage.childImageSharp.fluid} alt={post.frontmatter.featuredImageAlt} className="card-image blog-featured-image" />
      }
      <Card.Content>
        <Heading renderAs="h5" size={6} subtitle className="has-text-grey-light">
          {post.frontmatter.date} &mdash; {post.fields.readingTime.text}
        </Heading>
        <Heading renderAs="h2" size={3}>{post.frontmatter.title}</Heading>
        <Heading renderAs="h4" size={5} subtitle className="has-text-grey margin-bottom-025">{post.frontmatter.description}</Heading>
      </Card.Content>
    </Card>
  </Link>
)

export default BlogFeaturedPostTease
