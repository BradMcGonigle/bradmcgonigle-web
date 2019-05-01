import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLink } from '@fortawesome/fontawesome-pro-light'
import { Card, Columns, Container, Content, Heading, Section } from 'react-bulma-components'

import Footer from '../components/footer'
import Layout from '../components/layout'

const LinkItem = styled(Columns.Column)`
  .card {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .card-image {
      background-color: #eee;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.125);
      text-align: center;

      figure {
        height: 212px;
      }

      span.icon {
        bottom: 0;
        color: #e7e7e7;
        font-size: 3rem;
        height: 100%;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transition: 250ms color ease-in-out;
        width: 100%;
      }
    }

    .card-content {
      flex-grow: 1;

      time {
        font-size: 0.875rem;
      }
    }

    .card-footer {
      background-color: #fcfcfc;
      font-size: 0.8rem;

      a {
        color: #999;
      }

      .card-footer-item {
        flex-grow: 0;
        padding-bottom: 0.33rem;
        padding-top: 0.33rem;
      }

      .view {
        flex-grow: 1;

        &:hover {
          background-color: #f6f6f6;
        }
      }
    }

    &:hover {
      .card-image {
        span.icon {
          color: #e1e1e1;
        }
      }
    }
  }
`

export default class LinksPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <Section>
          <Container>
            <Heading size={4} className="has-text-weight-medium">
              <span>
                Links{' '}
                <small className="has-text-weight-light">
                  &mdash; Interesting finds from around the web
                </small>
              </span>
            </Heading>
            <Columns multiline>
              {posts
                .filter(
                  post => post.node.frontmatter.templateKey === 'link-post'
                )
                .map(({ node: post }) => (
                  <LinkItem
                    className="is-6-tablet is-4-desktop is-3-widescreen"
                    key={post.id}
                  >
                    <Card>
                      <a
                        href={post.frontmatter.url}
                        title={post.frontmatter.title}
                        className="card-image"
                      >
                        {post.frontmatter.image ? (
                          <Img
                            className="image"
                            fluid={
                              post.frontmatter.image.childImageSharp.fluid
                            }
                          />
                        ) : (
                          <figure className="is-hidden-mobile image">
                            <span className="icon is-large">
                              <FontAwesomeIcon icon={faExternalLink} />
                            </span>
                          </figure>
                        )}
                      </a>
                      <Card.Content
                        renderAs="a"
                        href={post.frontmatter.url}
                        title={post.frontmatter.title}
                        className="card-content"
                      >
                        <Content>
                          <time
                            dateTime={post.frontmatter.date}
                            className="has-text-grey"
                          >
                            {post.frontmatter.date}
                          </time>
                          <Heading size={5} subtitle>{post.frontmatter.title}</Heading>
                        </Content>
                      </Card.Content>
                      <Card.Footer>
                        <Link
                          to={post.frontmatter.path}
                          title="View Details"
                          className="card-footer-item view"
                        >
                          View Details
                        </Link>
                      </Card.Footer>
                    </Card>
                  </LinkItem>
                ))}
            </Columns>
          </Container>
        </Section>
        <Footer />
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query LinksQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 400)
          html
          frontmatter {
            title
            templateKey
            path
            date(formatString: "MMMM DD, YYYY")
            url
            image {
              childImageSharp {
                fluid(maxWidth: 1000, maxHeight: 667, cropFocus: ENTROPY) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
