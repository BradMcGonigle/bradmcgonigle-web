const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ page, actions, graphql }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const linkPost = path.resolve(`./src/templates/link-post.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
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

    pages.forEach(({ node }, index) => {
      if (node.frontmatter.templateKey === 'blog-post') {
        createPage({
          path: node.frontmatter.path,
          component: blogPost,
          context: {},
        })
      }

      if (node.frontmatter.templateKey === 'link-post') {
        const previous =
          index === pages.length - 1 ? false : pages[index + 1].node
        const next = index === 0 ? false : pages[index - 1].node

        let context = {
          previous,
          next,
        }

        createPage({
          path: node.frontmatter.path,
          component: linkPost,
          context: context,
        })
      }

      if (
        node.frontmatter.templateKey !== 'blog-post' ||
        node.frontmatter.templateKey !== 'link-post'
      ) {
        createPage({
          path: node.frontmatter.path,
          component: path.resolve(
            `src/templates/${String(node.frontmatter.templateKey)}.js`
          ),
          context: {},
        })
      }
    })

    return null
  })
}
