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

const PostBody = styled('div')`
  margin-top: 1.5rem;
`

export const LinkItem = ({ post }) => {
  const PostContent = HTMLContent || ContentWrapper

  return (
    <React.Fragment>
      <SEO
        keywords={post.frontmatter.tags}
        title={`${post.frontmatter.title} | Links`}
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
        <PostBody>
          <PostContent content={post.frontmatter.html} />
        </PostBody>
        <Tags list={post.frontmatter.tags || []} ignore="link" />
      </Columns.Column>
    </React.Fragment>
  )
}

export default LinkItem
