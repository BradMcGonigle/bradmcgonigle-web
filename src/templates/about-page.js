import React from 'react'
import { graphql } from 'gatsby'

import Img from 'gatsby-image'

import Content, { HTMLContent } from '../components/content'
import Footer from '../components/footer'
import Layout from '../components/layout'

export const AboutPageTemplate = ({
  title,
  image,
  content,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content

  return (
    <div>
      <Layout>
        <section className="section">
          <div className="container content">
            <div className="columns">
              <div className="column is-5">
                <Img className="image" fluid={image.childImageSharp.fluid} />
              </div>
              <div className="column is-5 is-offset-1">
                <h1 className="title">{title}</h1>
                <PageContent className="content" content={content} />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </Layout>
    </div>
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
