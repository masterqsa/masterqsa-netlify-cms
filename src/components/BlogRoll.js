import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

const MAX_POSTS_IN_SNIPPET = 3

class BlogRoll extends React.Component {
  render() {
    const { data, pageView } = this.props
    const { edges: posts } = data.allContentfulBlogPost
    const maxPostsToShow = pageView
      ? posts.length
      : Math.min(posts.length, MAX_POSTS_IN_SNIPPET)
    const visiblePosts = posts.slice(0, maxPostsToShow)

    return (
      <div className="tq-blog-grid">
        {visiblePosts.map(({ node: post }) => {
          const finalSlug = `/blog/${post.slug}`
          const excerptText =
            post.body &&
            post.body.childMarkdownRemark &&
            post.body.childMarkdownRemark.excerpt
              ? post.body.childMarkdownRemark.excerpt
              : ''

          return (
            <article key={post.slug} className="tq-blog-card">
              {post.featuredImage && post.featuredImage.gatsbyImageData && (
                <Link
                  to={finalSlug}
                  className="tq-blog-card__thumb"
                  aria-label={`Read article "${post.title}"`}
                >
                  <GatsbyImage
                    image={post.featuredImage.gatsbyImageData}
                    alt={`Featured image for ${post.title}`}
                  />
                </Link>
              )}
              <div className="tq-blog-card__body">
                {post.publishedDate && (
                  <time className="tq-blog-card__date">
                    {post.publishedDate}
                  </time>
                )}
                <Link className="tq-blog-card__title" to={finalSlug}>
                  {post.title}
                </Link>
                <p className="tq-blog-card__excerpt">{excerptText}</p>
                <Link className="tq-text-link" to={finalSlug}>
                  Keep Reading →
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    )
  }
}

BlogRoll.propTypes = {
  pageView: PropTypes.bool,
  data: PropTypes.shape({
    allContentfulBlogPost: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default ({ pageView = false }) => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
          edges {
            node {
              title
              slug
              isFeaturedPost
              publishedDate(formatString: "MMMM DD, YYYY")
              body {
                childMarkdownRemark {
                  excerpt(pruneLength: 200)
                }
              }
              featuredImage {
                gatsbyImageData(
                  width: 480
                  quality: 80
                  placeholder: BLURRED
                  formats: [AUTO, WEBP]
                )
              }
            }
          }
        }
      }
    `}
    render={data => <BlogRoll data={data} pageView={pageView} />}
  />
)
