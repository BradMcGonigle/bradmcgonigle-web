import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { Columns, Container, Section } from 'react-bulma-components'

import Layout from '../components/layout'
import LinkedCard from '../components/shared/linked-card'
import SectionHeader from '../components/section-header'
import SEO from '../components/seo'

export const TaggedItems = ({ data, pageContext }) => {
  const { edges: posts, totalCount } = data.allMarkdownRemark
  const { tag } = pageContext

  const tagline = `${totalCount} item${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`

  return (
    <Layout>
      <SEO keywords={[`${tag}`]} title={`Items tagged with ${tag}`} />
      <Section>
        <Container>
          <SectionHeader link="/tags" section="Tags" tagline={tagline} />
          <Columns>
            {posts.map(({ node: post }, i) => (
              <Columns.Column
                tablet={{ size: 'half' }}
                desktop={{ size: 'one-third' }}
                widescreen={{ size: 'one-quarter' }}
                key={post.id}
              >
                <LinkedCard post={post} />
              </Columns.Column>
            ))}
          </Columns>
        </Container>
      </Section>
    </Layout>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      query($tag: String) {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
          totalCount
          edges {
            node {
              excerpt(pruneLength: 100, truncate: true)
              id
              fields {
                readingTime {
                  text
                }
              }
              frontmatter {
                templateKey
                title
                description
                date(formatString: "MMMM DD, YYYY")
                path
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
                      src
                      tracedSVG
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                featuredImageAlt
                image {
                  childImageSharp {
                    fluid(
                      maxWidth: 1000
                      maxHeight: 667
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
                imageAlt
              }
            }
          }
        }
      }
    `}
    render={data => <TaggedItems data={data} {...props} />}
  />
)
