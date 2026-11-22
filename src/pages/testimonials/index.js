import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Layout from '../../components/Layout'
import CallToAction from '../../components/callToAction/CallToAction'
import { HTMLContent } from '../../components/Content'
import turboSpiral from '../../img/turbo-spiral.svg'

export const query = graphql`
  {
    allContentfulTestimonial(sort: { fields: createdAt, order: ASC }) {
      edges {
        node {
          id
          name
          testimony {
            raw
          }
          info
          url
          image {
            gatsbyImageData(
              height: 96
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  }
`

export default function TestimonialsIndexPage({ data }) {
  const testimonials =
    (data &&
      data.allContentfulTestimonial &&
      data.allContentfulTestimonial.edges) ||
    []

  return (
    <Layout>
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
            <span>CUSTOMER STORIES</span>
          </div>
          <h1 className="tq-page-hero__title">Testimonials</h1>
          <p className="tq-page-hero__lead">
            Hear how QSA companies and assessment teams streamline PCI
            compliance delivery with TurboQSA.
          </p>
        </div>
      </section>

      <section className="tq-section tq-section--paper">
        <div className="tq-wrap">
          <ul
            className="tq-testimonials-grid"
            style={{ marginBottom: '56px' }}
          >
            {testimonials.map(({ node: testimonial }) => (
              <li key={testimonial.id} className="tq-testimonial-card">
                <div className="testimonial__heading">
                  {testimonial.image && testimonial.image.gatsbyImageData && (
                    <GatsbyImage
                      image={testimonial.image.gatsbyImageData}
                      alt={testimonial.name || 'Customer portrait'}
                      className="testimonial__image"
                    />
                  )}
                  <div>
                    <h2
                      className="testimonial__name"
                      style={{ fontSize: '20px', marginBottom: '2px' }}
                    >
                      {testimonial.name}
                    </h2>
                    {testimonial.info && (
                      <p
                        className="testimonial__info"
                        style={{
                          fontSize: '14.5px',
                          color: 'var(--tq-muted)',
                          marginBottom: '2px',
                        }}
                      >
                        {testimonial.info}
                      </p>
                    )}
                    {testimonial.url && (
                      <p className="testimonial__url" style={{ margin: 0 }}>
                        <a
                          href={testimonial.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: 'var(--tq-green)',
                            fontWeight: 600,
                            fontSize: '14px',
                          }}
                        >
                          {testimonial.url}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
                <article
                  className="testimonial__testimony tq-richtext"
                  style={{ marginTop: '18px' }}
                >
                  <HTMLContent content={testimonial.testimony} />
                </article>
              </li>
            ))}
          </ul>

          <CallToAction />
        </div>
      </section>
    </Layout>
  )
}

TestimonialsIndexPage.propTypes = {
  data: PropTypes.object.isRequired,
}
