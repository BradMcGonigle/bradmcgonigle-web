import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Columns, Container, Heading, Section } from 'react-bulma-components'

import Content, { HTMLContent } from '../components/content'
import SiteFooter from '../components/footer'
import Layout from '../components/layout'

export const AboutPageTemplate = ({
  title,
  image,
  content,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content

  return (
    <Layout>
      <Section>
        <Container>
          <Columns>
            <Columns.Column size={5}>
              <Img alt="Its me!" fluid={image.childImageSharp.fluid} />
            </Columns.Column>
            <Columns.Column size={5} offset={1}>
              <Heading>{title}</Heading>
                <PageContent content={content} />
            </Columns.Column>
          </Columns>
        </Container>
      </Section>
      <SiteFooter />
    </Layout>
  )
}

export default ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <AboutPageTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      image={post.frontmatter.image}
      content={post.html}
    />
  )
}

export const aboutPageQuery = graphql`
  query AboutPage($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        image {
          childImageSharp {
            fluid(maxWidth: 1000, cropFocus: ENTROPY, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
