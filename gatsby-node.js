const blog = require('./bootstrap/blog')
const links = require('./bootstrap/links')
const other = require('./bootstrap/other')
const tags = require('./bootstrap/tags')

exports.createPages = async ({ actions, graphql }) => {
  await blog.createPages(actions, graphql)
  await links.createPages(actions, graphql)
  await other.createPages(actions, graphql)
  await tags.createPages(actions, graphql)
}
