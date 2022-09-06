import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { Card, Heading } from 'react-bulma-components'

const BlogFeaturedPostTease = ({ post }) => {
  let postImage, postImageAlt
  if (post.frontmatter.featuredImage) {
    postImage = post.frontmatter.featuredImage.childImageSharp.fluid
    postImageAlt = post.frontmatter.featuredImageAlt
  } else {
    postImage = post.frontmatter.image.childImageSharp.fluid
    postImageAlt = post.frontmatter.imageAlt
  }

  return (
    <Link to={post.frontmatter.path}>
      <Card className="no-border horizontal-card is-flex-tablet">
        <Img
          fluid={postImage}
          alt={postImageAlt}
          className="card-image blog-featured-image"
        />
        <Card.Content>
          <Heading renderAs="h5" size={6} subtitle className="has-text-grey-dark">
            {/*{post.frontmatter.date} &mdash; */}{post.fields.readingTime.text}
          </Heading>
          <Heading className="margin-bottom-2" renderAs="h2" size={3}>
            {post.frontmatter.title}
          </Heading>
          <Heading
            renderAs="h4"
            size={5}
            subtitle
            className="has-text-grey-darker has-text-weight-light margin-bottom-025"
          >
            {post.frontmatter.description}
          </Heading>
        </Card.Content>
      </Card>
    </Link>
  )
}

export default BlogFeaturedPostTease
