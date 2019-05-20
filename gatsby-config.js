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
        }
      }
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
            }
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
};
