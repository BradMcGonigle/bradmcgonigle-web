import React from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import { Columns, Container, Content, Hero } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/pro-light-svg-icons'

import BlogFeaturedPostTease from './featured-post-tease'
import BlogPostTeaseCard from './post-tease-card'
import SectionHeader from '../section-header'

const BlogRecentPosts = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Hero color="white">
      <Hero.Body>
        <Container>
          <Content>
            <SectionHeader
              isSubSection
              link="/blog"
              section="Writings"
              tagline="Thoughts on things"
            />
            <Columns>
              {posts.map(({ node: post }) => (
                <Columns.Column size={6} key={post.id}>
                  <BlogPostTeaseCard post={post} />
                </Columns.Column>
              ))}
              {/*
              {posts.map(({ node: post }, i, { length }) => (
                <React.Fragment>
                  {i === 0 && (
                    <Columns.Column size={12} key={post.id}>
                      <BlogFeaturedPostTease post={post} />
                    </Columns.Column>
                  )}
                </React.Fragment>
              ))}
            </Columns>
            <Columns>
              {posts.map(({ node: post }, i, { length }) => (
                <React.Fragment>
                  {i !== 0 && i <= 3 && (
                    <Columns.Column size={4} key={post.id}>
                      <BlogPostTeaseCard post={post} />
                    </Columns.Column>
                  )}
                </React.Fragment>
              ))}
              */}
            </Columns>
          </Content>
          <p className="has-text-right">
            <Link to="/blog">
              View more <FontAwesomeIcon icon={faChevronRight} size="xs" />
            </Link>
          </p>
        </Container>
      </Hero.Body>
    </Hero>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      query BlogRecentPosts {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
          limit: 4
        ) {
          edges {
            node {
              excerpt(pruneLength: 600)
              id
              fields {
                readingTime {
                  text
                }
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                description
                path
                featuredImage {
                  childImageSharp {
                    fluid(
                      maxWidth: 500
                      traceSVG: {
                        turdSize: 10
                        background: "#fefefe"
                        color: "#eeeeee"
                      }
                    ) {
                      tracedSVG
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                image {
                  childImageSharp {
                    fluid(
                      maxWidth: 3000
                      traceSVG: {
                        turdSize: 10
                        background: "#fefefe"
                        color: "#eeeeee"
                      }
                    ) {
                      tracedSVG
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                imageAlt
              }
            }
          }
        }
      }
    `}
    render={data => <BlogRecentPosts data={data} {...props} />}
  />
)
