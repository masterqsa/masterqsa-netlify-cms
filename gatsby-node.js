const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const remark = require('remark')
const remarkHTML = require('remark-html')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      contentfulLandingPage {
        id
      }
      contentfulAboutUsPage {
        id
      }
      contentfulContactPage {
        id
      }
      contentfulPilotPage {
        id
      }
      contentfulProductsPage {
        id
      }
      allContentfulBlogPost(limit: 1000) {
        edges {
          node {
            id
            slug
            tags {
              label
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    createPage({
      path: `/`,
      component: path.resolve(`src/templates/index-page.js`),
      context: {
        id: result.data.contentfulLandingPage.id,
      },
    })

    createPage({
      path: `/about`,
      component: path.resolve(`src/templates/about-page.js`),
      context: {
        id: result.data.contentfulAboutUsPage.id,
      },
    })

    createPage({
      path: `/about`,
      component: path.resolve(`src/templates/about-page.js`),
      context: {
        id: result.data.contentfulAboutUsPage.id,
      },
    })

    createPage({
      path: `/contact`,
      component: path.resolve(`src/templates/contact-page.js`),
      context: {
        id: result.data.contentfulContactPage.id,
      },
    })

    createPage({
      path: `/pilot`,
      component: path.resolve(`src/templates/pilot-page.js`),
      context: {
        id: result.data.contentfulPilotPage.id,
      },
    })

    createPage({
      path: `/products`,
      component: path.resolve(`src/templates/products-page.js`),
      context: {
        id: result.data.contentfulProductsPage.id,
      },
    })

    const posts = result.data.allContentfulBlogPost.edges

    posts.forEach(edge => {
      const id = edge.node.id
      createPage({
        path: `/blog/${edge.node.slug}`,
        tags: edge.node.tags,
        component: path.resolve(`src/templates/blog-post.js`),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.tags`)) {
        tags = tags.concat(edge.node.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag.label)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag: tag.label,
        },
      })
    })
  })
}

function fnParseFrontmatterMarkdownFields(node, whitelist = [`description`]) {
  if (node.frontmatter) {
    if (
      node.fileAbsolutePath &&
      node.fileAbsolutePath.includes('about/index.md')
    ) {
      parseMarkdownFields(node.frontmatter)
    }
  }

  function parseMarkdownFields(frontmatterNode) {
    if (
      !frontmatterNode ||
      typeof frontmatterNode !== 'object' ||
      Object.keys(frontmatterNode).length === 0
    ) {
      return
    }
    for (const field in frontmatterNode) {
      if (!frontmatterNode.hasOwnProperty(field)) {
        continue
      }

      if (
        whitelist.includes(field) &&
        typeof frontmatterNode[field] === 'string'
      ) {
        // It's not a good practice to perform changes on fields in-place,
        // but it is the easiest solution to transform Markdown to HTML
        frontmatterNode[field] = remark()
          .use(remarkHTML)
          .processSync(frontmatterNode[field])
          .toString()
      } else {
        parseMarkdownFields(frontmatterNode[field])
      }
    }
  }
}

exports.onCreateNode = ({ node }) => {
  fnParseFrontmatterMarkdownFields(node) // convert Markdown frontmatter fields to HTML
}
