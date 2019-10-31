import React from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import { Columns, Container, Hero } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import LinkItemCard from './link-item-card'
import SectionHeader from '../section-header'

const LinksRecentLinks = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Hero color="light">
      <Hero.Body>
        <Container>
          <SectionHeader
            isSubSection
            link="/links"
            section="Links"
            tagline="Interesting finds from around the web"
          />
          <Columns multiline>
            {posts.map(({ node: post }) => (
              <Columns.Column
                key={post.id}
                tablet={{ size: 'half' }}
                desktop={{ size: 'one-third' }}
                widescreen={{ size: 'one-quarter' }}
              >
                <LinkItemCard post={post} />
              </Columns.Column>
            ))}
          </Columns>
          <p className="has-text-right">
            <Link to="/links">
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
      query RecentLinkPosts {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "link-post" } } }
          limit: 4
        ) {
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
                    fluid(
                      maxWidth: 1000
                      maxHeight: 667
                      cropFocus: ENTROPY
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
              }
            }
          }
        }
      }
    `}
    render={data => <LinksRecentLinks data={data} {...props} />}
  />
)
