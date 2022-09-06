import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { Content, Heading, Media } from 'react-bulma-components'

const BlogPostTease = ({ post }) => {
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
      <Media>
        <Media.Item renderAs="figure" position="left">
          <Img
            fluid={postImage}
            alt={postImageAlt}
            className="image is-128x128"
          />
        </Media.Item>
        <Media.Item>
          <Content>
            <Heading
              renderAs="h5"
              size={6}
              subtitle
              className="has-text-grey-dark"
            >
              {/*{post.frontmatter.date} &mdash; */}{post.fields.readingTime.text}
            </Heading>
            <Heading renderAs="h2" size={3}>
              {post.frontmatter.title}
            </Heading>
            <Heading
              renderAs="h4"
              size={5}
              subtitle
              className="has-text-weight-light has-text-grey-darker  margin-bottom-025"
            >
              {post.frontmatter.description}
            </Heading>
          </Content>
        </Media.Item>
      </Media>
    </Link>
  )
}

export default BlogPostTease
