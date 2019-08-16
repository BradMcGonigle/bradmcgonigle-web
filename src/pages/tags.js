import React from 'react'
import kebabCase from 'lodash/kebabCase'
import { Link, graphql } from 'gatsby'
import { Container, Heading, Section } from 'react-bulma-components'
import styled from '@emotion/styled'
import facepaint from 'facepaint'

import { BREAKPOINTS } from '../constants/breakpoints'
import Layout from '../components/layout'
import SectionHeader from '../components/section-header'
import SEO from '../components/seo'

const mq = facepaint(BREAKPOINTS.map(bp => `@media (min-width: ${bp}px)`))

const responsiveColumns = mq({
  columnCount: ['1', '2', '3', '4'],
})

const TagColumns = styled.div`
  ${responsiveColumns};
`

let currentLetter = ''

class TagsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filterQuery: ``,
    }
  }

  render() {
    const {
      data: {
        allMarkdownRemark: { group },
      },
    } = this.props
    const { filterQuery } = this.state

    const uniqGroup = group.reduce((lookup, tag) => {
      const key = kebabCase(tag.fieldValue.toLowerCase())
      if (!lookup[key]) {
        lookup[key] = Object.assign(tag, {
          slug: `/tags/${key}`,
        })
      } else {
        lookup[key].totalCount += tag.totalCount
      }
      // Prefer spaced tag names (instead of hyphenated) for display
      if (tag.fieldValue.includes(` `)) {
        lookup[key].fieldValue = tag.fieldValue
      }
      return lookup
    }, {})

    const results = Object.keys(uniqGroup)
      .sort((tagA, tagB) => tagA.localeCompare(tagB))
      .filter(key => uniqGroup[key].fieldValue.includes(filterQuery))

    return (
      <Layout>
        <SEO keywords={['tags']} title="Tags" />
        <Section>
          <Container>
            <SectionHeader
              section="Tags"
              tagline="These might be useful one day"
            />
            <TagColumns>
              {results.map(key => {
                const tag = uniqGroup[key]
                const firstLetter = tag.fieldValue.charAt(0).toLowerCase()
                const buildTag = (
                  <div key={tag.fieldValue} className="inline-block">
                    <Link
                      to={`/tags/${kebabCase(tag.fieldValue)}/`}
                      className="padding-right-2"
                    >
                      {tag.fieldValue} ({tag.totalCount})
                    </Link>
                  </div>
                )

                if (currentLetter !== firstLetter) {
                  currentLetter = firstLetter
                  return (
                    <React.Fragment key={`letterheader-${currentLetter}`}>
                      <Heading
                        renderAs="h4"
                        size={4}
                        className="margin-bottom-025 margin-top-2"
                      >
                        {currentLetter.toUpperCase()}
                      </Heading>
                      {buildTag}
                    </React.Fragment>
                  )
                }
                return buildTag
              })}
            </TagColumns>
          </Container>
        </Section>
      </Layout>
    )
  }
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
