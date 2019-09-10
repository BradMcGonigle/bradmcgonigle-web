const path = require('path')
const _ = require('lodash')

module.exports.createPages = async (actions, graphql) => {
  const { createPage } = actions
  try {
    graphql(
      `
        {
          allMarkdownRemark(
            filter: {
              frontmatter: {
                draft: { eq: false }
                templateKey: { in: ["blog-post", "link-post"] }
              }
            }
            limit: 1000
          ) {
            edges {
              node {
                frontmatter {
                  tags
                  templateKey
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

      let tags = []

      pages.forEach(edges => {
        if (_.get(edges, `node.frontmatter.tags`)) {
          tags = tags.concat(edges.node.frontmatter.tags)
        }
      })

      tags = _.uniq(tags)

      tags.forEach(tag => {
        createPage({
          path: `/tags/${_.kebabCase(tag)}`,
          component: path.resolve(`src/templates/tag.js`),
          context: {
            tag,
          },
        })
      })

      return null
    })
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}
