import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { Box, Button, Content, Heading, Level, Media} from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/pro-light-svg-icons'

const BlogPostTease = ({ post }) => (
  <Link to={post.frontmatter.path}>
    <Media>
      <Media.Item renderAs="figure" position="left">
        <Img fluid={post.frontmatter.image.childImageSharp.fluid} alt={post.frontmatter.image} className="image is-128x128" />
      </Media.Item>
      <Media.Item>
        <Content>
          <Heading renderAs="h2" size={3}>Small {post.frontmatter.title}</Heading>
          <Heading renderAs="h4" size={5} subtitle className="has-text-grey margin-bottom-025">{post.frontmatter.description}</Heading>
          <Heading renderAs="h5" size={6} subtitle className="has-text-grey-light">
            {post.frontmatter.date} &mdash; {post.fields.readingTime.text}
          </Heading>
        </Content>
      </Media.Item>
    </Media>
  </Link>
)

export default BlogPostTease
