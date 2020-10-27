import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import Text from './core/Text'
import { OrganismHeader } from './core/Headers'

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allContentfulBlogPost

    return (
      <div className="columns is-4 is-variable">
        {posts &&
          posts.map(({ node: post }) => {
            const finalSlug = `/blog/${post.slug}`
            return (
              <div className="is-parent column is-4" key={post.id}>
                <article
                  className={`blog-list-item tile is-child box notification ${
                    post.isFeaturedPost ? 'is-featured' : ''
                  }`}
                >
                  <header>
                    {post.featuredImage ? (
                      <div className="featured-thumbnail">
                        <Img {...post.featuredImage} alt={`featured image thumbnail for post ${post.title}`} />
                      </div>
                    ) : null}
                    <OrganismHeader className="post-meta">
                      <Link className="title" to={finalSlug}>
                        {post.title}
                      </Link>
                      <time className="subtitle is-block">
                        {post.publishedDate}
                      </time>
                    </OrganismHeader>
                  </header>
                  <Text>
                    {post.body.childMarkdownRemark.excerpt}
                    <br />
                    <br />
                    <Link
                      className="button is-dark is-outlined is-hidden-mobile"
                      to={finalSlug}
                    >
                      Keep Reading →
                    </Link>
                    <Link
                      className="is-dark is-outlined is-hidden-tablet"
                      to={finalSlug}
                    >
                      Keep Reading →
                    </Link>
                  </Text>
                </article>
              </div>
            )
          })}
      </div>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allContentfulBlogPost: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allContentfulBlogPost(sort: {fields: publishedDate, order: DESC}) {
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
                fluid(maxWidth: 120, quality: 100) {
                  ...GatsbyContentfulFluid
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
