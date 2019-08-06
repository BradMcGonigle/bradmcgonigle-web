import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { Columns, Container, Section } from 'react-bulma-components'

import Layout from '../components/layout'
import LinkItem from '../components/links/link-item'
import PreviousNext from '../components/previous-next'
import SectionHeader from '../components/section-header'

const LinkPostDetail = ({ data, pageContext }) => {
  const { markdownRemark: post } = data
  const { next, previous } = pageContext

  return (
    <Layout>
      <Section>
        <Container>
          <SectionHeader
            link="/links"
            section="Links"
            tagline="Interesting finds from around the web"
          />
          <Columns>
            <LinkItem post={post} key={post.id} />
          </Columns>
        </Container>
      </Section>
      <PreviousNext next={next} previous={previous} />
    </Layout>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
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
                fluid(
                  maxWidth: 500
                  traceSVG: {
                    turdSize: 10
                    background: "#fefefe"
                    color: "#eeeeee"
                  }
                ) {
                  src
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
    render={data => <LinkPostDetail data={data} {...props} />}
  />
)
