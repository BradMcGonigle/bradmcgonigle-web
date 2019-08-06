import React from 'react'
import {
  Columns,
  Container,
  Heading,
  Hero,
  Section,
} from 'react-bulma-components'

import { ContentWrapper, HTMLContent } from '../content'
import { Image } from '../shared'
import SEO from '../seo'
import Tags from '../tags'

export const BlogPostDetail = ({ post }) => {
  const PostContent = HTMLContent || ContentWrapper

  let postImage
  if (post.frontmatter.featuredImage) {
    postImage = post.frontmatter.featuredImage.childImageSharp.fluid.src
  } else {
    postImage = post.frontmatter.image.childImageSharp.fluid.src
  }

  return (
    <React.Fragment>
      <SEO
        description={post.frontmatter.description}
        image={postImage}
        keywords={post.frontmatter.tags}
        title={post.frontmatter.title}
        url={post.frontmatter.path}
      />
      <Section className="padding-top-050">
        <Container>
          <Columns>
            <Columns.Column size={9}>
              <Heading
                renderAs="h5"
                size={6}
                subtitle
                className="has-text-grey"
              >
                {post.frontmatter.date}
                <span className="has-text-grey-light">
                  {' '}
                  &mdash; {post.fields.readingTime.text}
                </span>
              </Heading>
              <Heading renderAs="h1" size={3}>
                {post.frontmatter.title}
              </Heading>
              <Heading
                renderAs="h4"
                size={4}
                subtitle
                className="has-text-grey margin-bottom-025"
              >
                {post.frontmatter.description}
              </Heading>
            </Columns.Column>
          </Columns>
        </Container>
      </Section>
      {post.frontmatter.featuredImage && (
        <Hero className="margin-bottom-2">
          <Image
            caption={post.frontmatter.featuredImageAlt}
            image={post.frontmatter.featuredImage.childImageSharp.fluid}
            isHero
          />
        </Hero>
      )}
      <Section className="padding-top-050">
        <Container>
          <Columns>
            <Columns.Column size={9}>
              {!post.frontmatter.featuredImage && post.frontmatter.image && (
                <div className="margin-bottom-2">
                  <Image
                    image={post.frontmatter.image.childImageSharp.fluid}
                    caption={post.frontmatter.imageAlt}
                  />
                </div>
              )}
              <PostContent content={post.html} className="blog-post" />
              <hr />
              <Tags list={post.frontmatter.tags || []} ignore="link" />
            </Columns.Column>
          </Columns>
        </Container>
      </Section>
    </React.Fragment>
  )
}

export default BlogPostDetail
