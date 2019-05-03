import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/fontawesome-pro-light'
import { Columns, Container, Heading, Hero, Section } from 'react-bulma-components'

import Content, { HTMLContent } from '../components/content'
import Layout from '../components/layout'
import SiteFooter from '../components/footer'
import Tags from '../components/tags'

const Summary = styled('blockquote')`
  font-size: 0.85rem;
  margin-top: -1.25rem !important;
`

const PostBody = styled('div')`
  margin-top: 1.5rem;
`

export const LinkPostTemplate = ({
  content,
  contentComponent,
  helmet,
  html,
  title,
  summary,
  image,
  date,
  url,
  tags,
  next,
  prev,
}) => {
  const PostContent = contentComponent || Content

  return (
    <Layout>
      <Section>
        {helmet || ''}
        <Container>
          <Heading size={4} className="has-text-weight-medium">
            <Link to="/links" className="prev is-size-6">
              <FontAwesomeIcon icon={faChevronLeft} />
            </Link>
            <span>
              Links{' '}
              <small className="has-text-weight-light">
                &mdash; Interesting finds
              </small>
            </span>
          </Heading>
          <Columns>
            {image && (
              <Columns.Column size={4}>
                <a href={url} title="{title}">
                  <Img fluid={image.childImageSharp.fluid} />
                </a>
              </Columns.Column>
            )}
            <Columns.Column size={6}>
              <Heading subtitle className="has-text-grey">{date}</Heading>
              <Heading>
                <a href={url} title="{title}">
                  {title}
                </a>
              </Heading>
              {summary && (
                <Summary className="subtitle is-italic has-text-grey">
                  <p>{summary}</p>
                </Summary>
              )}
              <PostBody>
                <PostContent content={content} />
              </PostBody>
              <Tags list={tags || []} ignore="link" />
            </Columns.Column>
          </Columns>
        </Container>
      </Section>

      <Hero className="prev-next-nav is-semi-light">
        <Hero.Body>
          <Container>
            <Columns className="has-text-centered-mobile">
              <Columns.Column size={4}>
                {next && (
                  <React.Fragment>
                    <Heading size={7} subtitle className="has-text-weight-bold is-uppercase">
                      Next
                    </Heading>
                    <Heading size={4} className="has-text-weight-light">
                      <Link className="link prev" to={next.frontmatter.path}>
                        <FontAwesomeIcon
                          icon={faChevronLeft}
                          className="is-size-6"
                        />
                      </Link>
                      <Link to={next.frontmatter.path}>
                        <span>{next.frontmatter.title}</span>
                      </Link>
                    </Heading>
                  </React.Fragment>
                )}
              </Columns.Column>
              {prev && next && <hr className="is-hidden-tablet" />}
              <Columns.Column size={4} offset={4} className="has-text-right-tablet has-text-centered-mobile">
                {prev && (
                  <React.Fragment>
                    <Heading subtitle size={7} className="has-text-weight-bold is-uppercase">
                      Previous
                    </Heading>
                    <Heading size={4} className="has-text-weight-light">
                      <Link to={prev.frontmatter.path}>
                        <span>{prev.frontmatter.title}</span>
                      </Link>
                      <Link className="link next" to={prev.frontmatter.path}>
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="is-size-6"
                        />
                      </Link>
                    </Heading>
                  </React.Fragment>
                )}
              </Columns.Column>
            </Columns>
          </Container>
        </Hero.Body>
      </Hero>

      <SiteFooter />
    </Layout>
  )
}

export default ({ data, pageContext }) => {
  const { markdownRemark: post } = data
  const { next, prev } = pageContext

  return (
    <LinkPostTemplate
      helmet={<Helmet title={`Links | ${post.frontmatter.title}`} />}
      content={post.html}
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      summary={post.frontmatter.summary}
      html={post.html}
      date={post.frontmatter.date}
      url={post.frontmatter.url}
      image={post.frontmatter.image}
      tags={post.frontmatter.tags}
      next={next}
      prev={prev}
    />
  )
}

export const pageQuery = graphql`
  query LinkPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        summary
        path
        date(formatString: "MMMM DD, YYYY")
        url
        image {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        tags
      }
    }
  }
`
