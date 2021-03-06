import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery, navigate } from 'gatsby'
import Img from 'gatsby-image'
import Text from './core/Text'
import { OrganismHeader } from './core/Headers'
import { GatsbyImage } from 'gatsby-plugin-image'

const MAX_POSTS_IN_SNIPPET = 3

class BlogRoll extends React.Component {
  render() {
    const { data, pageView } = this.props
    const { edges: posts } = data.allContentfulBlogPost

    const postGroups = []
    const maxPostsToShow = pageView ? posts.length : MAX_POSTS_IN_SNIPPET

    for (let i = 0; i < maxPostsToShow; i++) {
      if (i % 3 === 0) {
        postGroups.push([])
      }
      postGroups[postGroups.length - 1].push(posts[i])
    }

    return (
      <React.Fragment>
        {postGroups.map((postsInGroup, groupIdx) => {
          return (
            <div className="tile is-ancestor" key={groupIdx}>
              {postsInGroup.map(({ node: post }) => {
                const finalSlug = `/blog/${post.slug}`
                return (
                  <div className="tile is-parent is-4" key={post.slug}>
                    <article
                      className={`blog-list-item tile is-child box notification ${
                        post.isFeaturedPost ? 'is-featured' : ''
                      }`}
                    >
                      <header>
                        {post.featuredImage ? (
                          <div
                            className="featured-thumbnail"
                            style={{ cursor: 'pointer' }}
                          >
                            <Link
                              to={finalSlug}
                              aria-label={`Go to full post "${post.title}"`}
                            >
                              <GatsbyImage
                                image={post.featuredImage.gatsbyImageData}
                                alt={`featured image thumbnail for post ${post.title}`}
                              />
                            </Link>
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
        })}
      </React.Fragment>
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
