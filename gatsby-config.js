module.exports = {
  siteMetadata: {
    title: 'Brad McGonigle',
    author: 'Brad McGonigle',
    description: 'Father, husband, developer, and nerd.',
    siteUrl: 'https://www.bradmcgonigle.com',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-catch-links',
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://www.bradmcgonigle.com',
      },
    },
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './src/favicon.png',
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-T6KTKL',
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: 'tomato',
        showSpinner: true,
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        ignore: ['**/.*'],
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        ignore: ['**/.*'],
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          `gatsby-remark-reading-time`,
          'gatsby-remark-static-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              linkImagesToOriginal: false,
              maxWidth: 1400,
              sizeByPixelDensity: true,
              quality: 100,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                let image
                if (edge.node.frontmatter.featuredImage) {
                  image =
                    edge.node.frontmatter.featuredImage.childImageSharp.fluid
                      .src
                } else if (edge.node.frontmatter.image) {
                  image = edge.node.frontmatter.image.childImageSharp.fluid.src
                }
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  enclosure: {
                    url: site.siteMetadata.siteUrl + image,
                  },
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { templateKey: { in: ["blog-post", "link-post"] } } }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      frontmatter {
                        path
                        title
                        description
                        date
                        featuredImage {
                          childImageSharp {
                            fluid(
                              maxWidth: 3000
                              maxHeight: 1250
                              cropFocus: ATTENTION
                            ) {
                              src
                            }
                          }
                        }
                        image {
                          childImageSharp {
                            fluid(
                              maxWidth: 3000
                            ) {
                              src
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'All Posts',
          },
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                let image
                if (edge.node.frontmatter.featuredImage) {
                  image =
                    edge.node.frontmatter.featuredImage.childImageSharp.fluid
                      .src
                } else if (edge.node.frontmatter.image) {
                  image = edge.node.frontmatter.image.childImageSharp.fluid.src
                }
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  enclosure: {
                    url: site.siteMetadata.siteUrl + image,
                  },
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      frontmatter {
                        path
                        title
                        description
                        date
                        featuredImage {
                          childImageSharp {
                            fluid(
                              maxWidth: 3000
                              maxHeight: 1250
                              cropFocus: ATTENTION
                            ) {
                              src
                            }
                          }
                        }
                        image {
                          childImageSharp {
                            fluid(
                              maxWidth: 3000
                            ) {
                              src
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: '/blog/rss.xml',
            title: 'Blog Posts',
          },
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                let image
                if (edge.node.frontmatter.featuredImage) {
                  image =
                    edge.node.frontmatter.featuredImage.childImageSharp.fluid
                      .src
                } else if (edge.node.frontmatter.image) {
                  image = edge.node.frontmatter.image.childImageSharp.fluid.src
                }
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  enclosure: {
                    url: site.siteMetadata.siteUrl + image,
                  },
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { templateKey: { eq: "link-post" } } }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      frontmatter {
                        path
                        title
                        description
                        date
                        featuredImage {
                          childImageSharp {
                            fluid(
                              maxWidth: 3000
                              maxHeight: 1250
                              cropFocus: ATTENTION
                            ) {
                              src
                            }
                          }
                        }
                        image {
                          childImageSharp {
                            fluid(
                              maxWidth: 3000
                            ) {
                              src
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: '/links/rss.xml',
            title: 'Links',
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cache",
    },
    // required to be last in the plugin array
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {},
        allPageHeaders: [],
        mergeSecurityHeaders: true,
        mergeLinkHeaders: true,
        mergeCachingHeaders: true,
        transformHeaders: (headers, path) => headers,
        generateMatchPathRewrites: true,
      },
    },
  ],
}
