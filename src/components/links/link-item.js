import React from 'react'
import styled from '@emotion/styled'
import { Columns, Heading } from 'react-bulma-components'

import { ContentWrapper, HTMLContent } from '../content'
import { Image } from '../shared'
import SEO from '../seo'
import Tags from '../tags'

const Description = styled('blockquote')`
  font-size: 0.85rem;
  margin-top: -1.25rem !important;
`

export const LinkItem = ({ post }) => {
  const PostContent = HTMLContent || ContentWrapper

  let postImage
  if (post.frontmatter.featuredImage) {
    postImage = post.frontmatter.featuredImage.childImageSharp.fluid.src
  } else if (post.frontmatter.image) {
    postImage = post.frontmatter.image.childImageSharp.fluid.src
  }

  return (
    <React.Fragment>
      <SEO
        description={post.frontmatter.description}
        image={postImage}
        keywords={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
      {post.frontmatter.image && (
        <Columns.Column size={4}>
          <Image
            caption={post.frontmatter.title}
            image={post.frontmatter.image.childImageSharp.fluid}
            url={post.frontmatter.url}
          />
        </Columns.Column>
      )}
      <Columns.Column size={6}>
        <Heading renderAs="h4" size={6} subtitle className="has-text-grey">
          {post.frontmatter.date}
        </Heading>
        <Heading renderAs="h1" size={3}>
          <a href={post.frontmatter.url} title="{post.frontmatter.title}">
            {post.frontmatter.title}
          </a>
        </Heading>
        {post.frontmatter.description && (
          <Description className="subtitle is-italic has-text-grey">
            <p>{post.frontmatter.description}</p>
          </Description>
        )}
        <PostContent content={post.html} />
        <Tags list={post.frontmatter.tags || []} ignore="link" />
      </Columns.Column>
    </React.Fragment>
  )
}

export default LinkItem
