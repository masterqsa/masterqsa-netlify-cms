import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  featuredImage,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <HTMLContent content={description} className="is-size-4" />
            {featuredImage && (
              <Img
                {...featuredImage}
                alt={`featured image for post ${title}`}
                style={{
                  marginTop: `1rem`,
                  marginBottom: `2rem`,
                }}
              />
            )}
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag.label + `tag`}>
                      <Link to={`/tags/${kebabCase(tag.label)}/`}>{tag.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  featuredimage: PropTypes.object,
  helmet: PropTypes.object,
}

const BlogPost = ({ data, uri }) => {
  const { contentfulBlogPost } = data

  return (
    <Layout>
      <BlogPostTemplate
        title={contentfulBlogPost.title}
        content={contentfulBlogPost.body.childMarkdownRemark.html}
        description={contentfulBlogPost.description.childMarkdownRemark.html}
        contentComponent={HTMLContent}
        tags={contentfulBlogPost.tags}
        featuredImage={contentfulBlogPost.featuredImage}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${contentfulBlogPost.title}`}</title>
            <meta
              name="description"
              content={`${contentfulBlogPost.description.rawMarkdownBody}`}
            />
            <meta
              property="og:title"
              content={`${contentfulBlogPost.title}`}
            />
            <meta
              property="og:url"
              content={`${uri}`}
            />
            {contentfulBlogPost.featuredimage && (
              <meta
                property="og:image"
                content={`${contentfulBlogPost.featuredimage.fluid.src}`}
              />
            )}
          </Helmet>
        }
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    contentfulBlogPost: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      id
      title
      description {
        childMarkdownRemark {
          html
          rawMarkdownBody
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
      featuredImage {
        fluid(maxWidth: 2048, quality: 100) {
          ...GatsbyContentfulFluid
        }
      }
      tags {
        label
      }
    }
  }
`
