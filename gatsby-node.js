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

exports.createSchemaCustomization = ({ actions, schema }) => {
 const { createTypes, createFieldExtension } = actions

 createFieldExtension({
   name: `defaultFalse`,
   extend() {
     return {
       resolve(source, args, context, info) {
         if (source[info.fieldName] == null) {
           return false
         }
         return source[info.fieldName]
       },
     }
   },
 })

 createTypes(`
   type MarkdownRemark implements Node {
     frontmatter: Frontmatter
   }
   type Frontmatter {
     draft: Boolean @defaultFalse
   }
 `)
}
