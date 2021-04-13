import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allContentfulBlogPost.edges

    const postLinks = posts.map(post => (
      <li key={post.node.slug}>
        <Link to={`/blog/${post.node.slug}`}>
          <h2 className="is-size-2">{post.node.title}</h2>
        </Link>
        <HTMLContent content={post.node.body.childMarkdownRemark.excerpt} />
      </li>
    ))
    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allContentfulBlogPost.totalCount
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } tagged with “${tag}”`

    return (
      <Layout>
        <section className="section">
          <Helmet title={`${tag} | ${title}`} />
          <div className="container content">
            <div className="columns">
              <div
                className="column is-10 is-offset-1"
                style={{ marginBottom: '6rem' }}
              >
                <h3 className="title is-size-4 is-bold-light">{tagHeader}</h3>
                <ul className="taglist">{postLinks}</ul>
                <p>
                  <Link to="/tags/">Browse all tags</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(
      limit: 1000
      sort: { fields: publishedDate, order: DESC }
      filter: { tags: { elemMatch: { label: { eq: $tag } } } }
    ) {
      totalCount
      edges {
        node {
          title
          slug
          body {
            childMarkdownRemark {
              excerpt(pruneLength: 200)
            }
          }
        }
      }
    }
  }
`
