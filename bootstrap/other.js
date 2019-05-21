const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

module.exports.createPages = async (actions, graphql) => {
  const { createPage } = actions

  try {
    graphql(
      `
        {
          allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: {
              frontmatter: { templateKey: { nin: ["blog-post", "link-post"] } }
            }
            limit: 1000
          ) {
            edges {
              node {
                frontmatter {
                  templateKey
                  path
                  title
                  date
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
          component: path.resolve(
            `src/templates/${String(edges.node.frontmatter.templateKey)}.js`
          ),
        })
      })

      return null
    })
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}
