const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] },
        limit: 1000
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            html
            id
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
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const pages = result.data.allMarkdownRemark.edges;

    return pages.forEach(({ node }, index) => {
      const prev = index === pages.length - 1 ? false : pages[index + 1].node;
      const next = index === 0 ? false : pages[index - 1].node;

      let context = {};
      if (
        node.frontmatter.templateKey === 'link-post' &&
        prev.frontmatter.templateKey === 'link-post' &&
        next.frontmatter.templateKey === 'link-post'
      ) {
        context = {
          prev,
          next
        }
      } else if (
        node.frontmatter.templateKey === 'link-post' &&
        prev.frontmatter.templateKey === 'link-post' &&
        next.frontmatter.templateKey !== 'link-post'
      ) {
        context = {
          prev
        }
      } else if (
          node.frontmatter.templateKey === 'link-post' &&
          prev.frontmatter.templateKey !== 'link-post' &&
          next.frontmatter.templateKey === 'link-post'
      ) {
        context = {
          next
        }
      }

      createPage({
        path: node.frontmatter.path,
        component: path.resolve(`src/templates/${String(node.frontmatter.templateKey)}.js`),
        context: context
      });
    });
  });
};
