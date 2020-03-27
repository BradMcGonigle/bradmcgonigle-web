/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function SEO({ description, image, keywords, lang = 'en', meta, title, type, url }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            description
            image
            site_url: siteUrl
            siteUrl
            title
            twitterHandle
          }
        }
      }
    `
  )

  const metaDescription = description
    ? description
    : site.siteMetadata.description
  const metaImage = image
    ? site.siteMetadata.siteUrl + image
    : site.siteMetadata.siteUrl + site.siteMetadata.image
  const metaType = type ? type : 'website'
  const metaUrl = url
    ? site.siteMetadata.siteUrl + url
    : site.siteMetadata.siteUrl
  const pageTitle = title ? title : site.siteMetadata.title

  return (
    <Helmet
      htmlAttributes={{
        class: 'has-navbar-fixed-top',
        lang,
      }}
      title={pageTitle}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          nane: `apple-mobile-web-app-status-bar-style`,
          content: `default`,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: metaType,
        },
        {
          property: `og:url`,
          content: metaUrl,
        },
        {
          property: `og:image`,
          content: metaImage,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.twitterHandle,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
    />
  )
}

SEO.defaultProps = {
  description: ``,
  keywords: [],
  lang: `en`,
  meta: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
