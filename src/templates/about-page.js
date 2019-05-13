import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { Box, Columns, Container, Heading, Hero } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFootballBall, faHockeySticks, faKnifeKitchen, faWater, faUserAstronaut } from '@fortawesome/pro-light-svg-icons';

import { ContentWrapper, HTMLContent } from '../components/content'
import Layout from '../components/layout'
import SEO from '../components/seo'

import Jobs from '../components/about/career/jobs'
import Tools from '../components/about/career/tools'

import { COLORS } from '../constants/colors';
import { RandomColor } from '../helpers/random-color'


const sectionColor = RandomColor(COLORS)

export const AboutPage = ({ data }) => {
  const { markdownRemark: page } = data
  const { nodes: jobs } = data.jobs
  const PageContent = HTMLContent || ContentWrapper

  return (
    <Layout>
      <SEO
        keywords={[`about`]}
        title="About"
      />
      <Hero className={`is-${sectionColor} is-bold`}>
        <Hero.Body>
          <Container>
            <Columns>
              <Columns.Column size={5}>
                <p className="has-opacity-50"><span className="icon is-large"><FontAwesomeIcon icon={faUserAstronaut} size="3x" /></span></p>
                <Heading renderAs="h1" size={4}>{page.frontmatter.title}</Heading>
                <PageContent content={page.html} />
                <hr className="has-opacity-15" />
                <Columns className="has-opacity-25">
                  <Columns.Column size={2}><span className="icon is-large"><FontAwesomeIcon icon={faWater} size="2x" /></span></Columns.Column>
                  <Columns.Column size={2}><span className="icon is-large"><FontAwesomeIcon icon={faHockeySticks} size="2x" /></span></Columns.Column>
                  <Columns.Column size={2}><span className="icon is-large"><FontAwesomeIcon icon={faFootballBall} size="2x" /></span></Columns.Column>
                  <Columns.Column size={2}><span className="icon is-large"><FontAwesomeIcon icon={faKnifeKitchen} size="2x" /></span></Columns.Column>
                </Columns>
              </Columns.Column>
              <Columns.Column size={4} offset={2}>
                <Box>
                  <Img alt="Its me!" fluid={page.frontmatter.image.childImageSharp.fluid} />
                </Box>
              </Columns.Column>
            </Columns>
          </Container>
        </Hero.Body>
      </Hero>
      <Jobs jobs={jobs} />
      <Tools />
    </Layout>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      query aboutPageQuery($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
          html
          frontmatter {
            path
            title
            image {
              childImageSharp {
                fluid(maxWidth: 650, cropFocus: ENTROPY, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        ...jobsQuery
      }
    `}
    render={data => <AboutPage data={data} {...props} />}
  />
)
