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

      pages.forEach(edges => {
        createPage({
          path: edges.node.frontmatter.path,
          component: path.resolve(`src/templates/blog-post.js`),
        })
      })
    })
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}
