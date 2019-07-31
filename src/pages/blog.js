import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { Columns, Container, Section } from 'react-bulma-components'

import BlogFeaturedPostTease from '../components/blog/featured-post-tease'
import BlogPostTeaseCard from '../components/blog/post-tease-card'
import BlogPostTease from '../components/blog/post-tease'
import Layout from '../components/layout'
import LinksRecentLinks from '../components/links/recent-links'
import SectionHeader from '../components/section-header'
import SEO from '../components/seo'

export const BlogIndex = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Layout>
      <SEO keywords={[`blog`]} title="Blog" />
      <Section>
        <Container>
          <SectionHeader section="Writings" tagline="Thoughts on things" />
          <Columns>
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
          </Columns>
          <Columns>
            {posts.map(({ node: post }, i, { length }) => (
              <React.Fragment>
                {i > 3 && (
                  <Columns.Column size={6} key={post.id}>
                    <BlogPostTease post={post} />
                  </Columns.Column>
                )}
              </React.Fragment>
            ))}
          </Columns>
        </Container>
      </Section>
      <LinksRecentLinks />
    </Layout>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      query BlogPostsQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 350)
              id
              fields {
                readingTime {
                  text
                }
              }
              frontmatter {
                title
                description
                templateKey
                date(formatString: "MMMM DD, YYYY")
                path
                featuredImage {
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
                featuredImageAlt
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
    render={data => <BlogIndex data={data} {...props} />}
  />
)
