import React from 'react'
import styled from '@emotion/styled'
import { Columns, Heading } from 'react-bulma-components'

import { ContentWrapper, HTMLContent } from '../content'
import { Image } from '../shared'
import SEO from '../seo'
import Tags from '../tags'

const Description = styled('blockquote')`
  font-size: 0.85rem;
  line-height: 1.5rem;
  margin: -0.75rem 0 1rem 0;
  border-left: 4px solid #eee;
  padding: 0.35rem 0 0.35rem 1rem;
`

const PostBody = styled('div')`
  margin-top: 1.5rem;
  line-height: 1.75rem;
`

const TagsWrapper = styled('div')`
  margin-top: 1.5rem;
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
        description={post.frontmatter.summary}
        image={postImage}
        keywords={post.frontmatter.tags}
        title={`Link: ${post.frontmatter.title}`}
        url={post.frontmatter.path}
      />
      {post.frontmatter.image && (
        <Columns.Column size={4}>
          <Image
            caption={
              post.frontmatter.imageAlt
                ? post.frontmatter.imageAlt
                : post.frontmatter.title
            }
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
        {post.frontmatter.summary && (
          <Description className="is-italic has-text-grey">
            <p>{post.frontmatter.summary}</p>
          </Description>
        )}
        <PostBody>
          <PostContent content={post.html} />
        </PostBody>
        <TagsWrapper>
          <Tags list={post.frontmatter.tags || []} ignore="link" />
        </TagsWrapper>
      </Columns.Column>
    </React.Fragment>
  )
}

export default LinkItem
