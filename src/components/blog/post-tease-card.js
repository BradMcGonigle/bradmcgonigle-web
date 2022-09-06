import React from 'react'
import Img from 'gatsby-image'
import { Card, Heading } from 'react-bulma-components'

const BlogPostTeaseCard = ({ small, post }) => {
  let postImage, postImageAlt
  if (post.frontmatter.featuredImage) {
    postImage = post.frontmatter.featuredImage.childImageSharp.fluid
    postImageAlt = post.frontmatter.featuredImageAlt
  } else {
    postImage = post.frontmatter.image.childImageSharp.fluid
    postImageAlt = post.frontmatter.imageAlt
  }

  console.log(postImage);
  console.log(postImageAlt);

  return (
    <Card renderAs="a" href={post.frontmatter.path} className="no-border">
      <Img
        fluid={postImage}
        alt={postImageAlt}
        className="card-image"
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
          className="has-text-weight-light has-text-grey-darker margin-bottom-025"
        >
          {post.frontmatter.description}
        </Heading>
      </Card.Content>
    </Card>
  )
}

export default BlogPostTeaseCard
