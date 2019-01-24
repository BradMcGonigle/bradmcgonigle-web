import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'

import Footer from '../components/footer'
import Layout from '../components/layout'

const FeaturedSection = styled('section')`
  position: relative;
  overflow: hidden;
  background-image: url('${props => props.src}');
  background-position: center center;
  background-size: cover;
`

const FeaturedProject = ({ post }) => (
  <Link to={post.frontmatter.path}>
    <FeaturedSection
      className="hero is-medium"
      src={post.frontmatter.featuredBackground.childImageSharp.fluid.src}
    >
      <div className="hero-body">
        <div className="container content">
          <div className="columns">
            {post.frontmatter.logo && (
              <div className="column is-4 is-10-mobile">
                <Img
                  fadeIn={false}
                  fluid={post.frontmatter.logo.childImageSharp.fluid}
                  title={post.frontmatter.title}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </FeaturedSection>
  </Link>
)

const Project = ({ post }) => (
  <div className="column is-3">
    <Link to={post.frontmatter.path}>
      <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
    </Link>
  </div>
)

export default class WorkPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div>
        <Layout>
          <section className="section">
            <div className="container content">
              <h1 className="title is-size-4 has-text-weight-medium">
                <span>
                  Work{' '}
                  <small className="has-text-weight-light">
                    &mdash; A small collection of projects
                  </small>
                </span>
              </h1>
            </div>
          </section>
          {posts
            .filter(
              post =>
                post.node.frontmatter.templateKey === 'work-project' &&
                post.node.frontmatter.featured
            )
            .map(({ node: post }) => (
              <FeaturedProject post={post} key={post.id} />
            ))}
          <section className="section">
            <div className="container content">
              <div className="columns">
                {posts
                  .filter(
                    post =>
                      post.node.frontmatter.templateKey === 'work-project' &&
                      !post.node.frontmatter.featured
                  )
                  .map(({ node: post }) => (
                    <Project post={post} key={post.id} />
                  ))}
              </div>
            </div>
          </section>
          <Footer />
        </Layout>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query WorkQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 400)
          html
          frontmatter {
            title
            templateKey
            featured
            path
            type
            summary
            featuredBackground {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  src
                }
              }
            }
            logo {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            image {
              childImageSharp {
                fluid(maxWidth: 1000) {
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
