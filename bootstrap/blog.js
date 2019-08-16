const path = require('path')
const _ = require('lodash')
const { createFilePath } = require('gatsby-source-filesystem')

module.exports.createPages = async (actions, graphql) => {
  const { createPage } = actions

  try {
    graphql(
      `
        {
          allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
            limit: 500
          ) {
            edges {
              node {
                frontmatter {
                  templateKey
                  path
                  date
                  tags
                }
              }
            }
          }
        }
      `
    ).then(result => {
      if (result.errors) {
        throw result.errors
      }

      const pages = result.data.allMarkdownRemark.edges

      pages.forEach(({ node }, index) => {
        const previous =
          index === pages.length - 1 ? false : pages[index + 1].node
        const next = index === 0 ? false : pages[index - 1].node

        createPage({
          path: node.frontmatter.path,
          component: path.resolve(`src/templates/blog-post.js`),
          context: {
            previous: previous,
            next: next,
          },
        })
      })
    })
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}
