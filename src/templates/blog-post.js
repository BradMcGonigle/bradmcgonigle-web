import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { Columns, Container, Section } from 'react-bulma-components'

import BlogPostDetail from '../components/blog/post-detail'
import Layout from '../components/layout'
import SectionHeader from '../components/section-header'

const BlogPostDetailWrapper = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <Section>
        <Container>
          <Columns>
            <Columns.Column size={7}>
              <SectionHeader
                link="/blog"
                section="Writings"
                tagline="Thoughts on things"
              />
            </Columns.Column>
          </Columns>
        </Container>
      </Section>
      <BlogPostDetail post={post} />
    </Layout>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
          html
          fields {
            readingTime {
              text
            }
          }
          frontmatter {
            path
            date(formatString: "MMMM DD, YYYY")
            title
            description
            category
            featuredImage {
              childImageSharp {
                fluid(
                  maxWidth: 3000
                  maxHeight: 1250
                  cropFocus: ATTENTION
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
            tags
          }
        }
      }
    `}
    render={data => <BlogPostDetailWrapper data={data} {...props} />}
  />
)
