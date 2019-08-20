import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { Content, Heading, Media } from 'react-bulma-components'

const BlogPostTease = ({ post }) => (
  <Link to={post.frontmatter.path}>
    <Media>
      <Media.Item renderAs="figure" position="left">
        {!post.frontmatter.featuredImage && post.frontmatter.image && (
          <Img
            fluid={post.frontmatter.image.childImageSharp.fluid}
            alt={post.frontmatter.imageAlt}
            className="image is-128x128"
          />
        )}
        {post.frontmatter.featuredImage && !post.frontmatter.image && (
          <Img
            fluid={post.frontmatter.featuredImage.childImageSharp.fluid}
            alt={post.frontmatter.featuredImageAlt}
            className="image is-128x128"
          />
        )}
      </Media.Item>
      <Media.Item>
        <Content>
          <Heading renderAs="h2" size={3}>
            {post.frontmatter.title}
          </Heading>
          <Heading
            renderAs="h4"
            size={5}
            subtitle
            className="has-text-grey margin-bottom-025"
          >
            {post.frontmatter.description}
          </Heading>
          <Heading
            renderAs="h5"
            size={6}
            subtitle
            className="has-text-grey-light"
          >
            {post.frontmatter.date} &mdash; {post.fields.readingTime.text}
          </Heading>
        </Content>
      </Media.Item>
    </Media>
  </Link>
)

export default BlogPostTease
