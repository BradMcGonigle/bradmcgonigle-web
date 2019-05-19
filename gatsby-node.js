const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ page, actions, graphql }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const linkPost = path.resolve(`./src/templates/link-post.js`)

  const blogPosts = graphql(
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
      createPage({
        path: node.frontmatter.path,
        component: blogPost,
      })
    })

    return null
  })

  const linkPosts = graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { frontmatter: { templateKey: { eq: "link-post" } } }
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
      const previous =
        index === pages.length - 1 ? false : pages[index + 1].node
      const next = index === 0 ? false : pages[index - 1].node

      createPage({
        path: node.frontmatter.path,
        component: linkPost,
        context: {
          previous: previous,
          next: next,
        },
      })
    })

    return null
  })

  const otherPages = graphql(
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

    pages.forEach(({ node }, index) => {
      createPage({
        path: node.frontmatter.path,
        component: path.resolve(
          `src/templates/${String(node.frontmatter.templateKey)}.js`
        ),
      })
    })

    return null
  })

  Promise.all([blogPosts, linkPosts, otherPages])
}
