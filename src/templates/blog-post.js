import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Layout from '../components/Layout'
import CallToAction from '../components/callToAction/CallToAction'
import Content, { HTMLContent } from '../components/Content'
import turboSpiral from '../img/turbo-spiral.svg'

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
    <React.Fragment>
      {helmet || ''}
      <section className="tq-page-hero tq-page-hero--compact">
        <img
          src={turboSpiral}
          alt=""
          aria-hidden="true"
          className="tq-page-hero__watermark"
        />
        <div className="tq-wrap tq-page-hero__inner">
          <div className="tq-eyebrow tq-eyebrow--light">
            <span className="tq-eyebrow__dot" aria-hidden="true" />
            <span>TURBOQSA BLOG</span>
          </div>
          <h1 className="tq-page-hero__title">{title}</h1>
          {description && (
            <div className="tq-page-hero__lead">
              <HTMLContent content={description} />
            </div>
          )}
        </div>
      </section>

      <section className="tq-section tq-section--white">
        <div className="tq-wrap">
          <article
            className="tq-card content"
            style={{
              maxWidth: '880px',
              margin: '0 auto 56px',
              padding: '36px',
            }}
          >
            {featuredImage && featuredImage.gatsbyImageData && (
              <GatsbyImage
                image={featuredImage.gatsbyImageData}
                alt={`Featured image for post ${title}`}
                style={{
                  marginBottom: '28px',
                  borderRadius: '10px',
                }}
              />
            )}
            <PostContent content={content} />
            {tags && tags.length ? (
              <div
                style={{
                  marginTop: '36px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--tq-line)',
                }}
              >
                <h2 style={{ fontSize: '15px', marginBottom: '10px' }}>Tags</h2>
                <ul
                  style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}
                >
                  {tags.map(tag => (
                    <li key={tag.label + 'tag'}>
                      <Link
                        className="tq-nav__sister"
                        to={`/tags/${kebabCase(tag.label)}/`}
                      >
                        {tag.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </article>

          <CallToAction />
        </div>
      </section>
    </React.Fragment>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  tags: PropTypes.array,
  title: PropTypes.string,
  featuredImage: PropTypes.object,
  helmet: PropTypes.object,
}

const BlogPost = ({ data, uri }) => {
  const { contentfulBlogPost } = data
  const ogImageSrc =
    contentfulBlogPost &&
    contentfulBlogPost.featuredImage &&
    contentfulBlogPost.featuredImage.fluid &&
    contentfulBlogPost.featuredImage.fluid.src

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
              content={`${contentfulBlogPost.description.childMarkdownRemark.excerpt}`}
            />
            <meta property="og:title" content={`${contentfulBlogPost.title}`} />
            <meta property="og:url" content={`${uri}`} />
            {ogImageSrc && <meta property="og:image" content={ogImageSrc} />}
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
  uri: PropTypes.string,
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
          excerpt(pruneLength: 500)
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
      featuredImage {
        gatsbyImageData(
          width: 1200
          placeholder: BLURRED
          formats: [AUTO, WEBP]
        )
        fluid(maxWidth: 1200, quality: 100) {
          ...GatsbyContentfulFluid
        }
      }
      tags {
        label
      }
    }
  }
`
