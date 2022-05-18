import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

import Layout from "../../components/Layout";
import { SectionHeader } from "../../components/core/Headers";
import FAQ from "../../components/FAQ";
import { HTMLContent } from "../../components/Content";

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
              width: 160
              quality: 160
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  }
`;

export default function TestimonialsIndexPage({ data }) {
  return (
    <Layout>
      <div className="section">
        <SectionHeader className="has-text-centered">
          Testimonials
        </SectionHeader>
      </div>
      <section className="section">
        <div className="container">
          <ul className="testimonialList">
            {data.allContentfulTestimonial.edges.map(
              ({ node: testimonial }) => {
                console.log(testimonial);
                return (
                  <li key={testimonial.id} className="testimonial">
                    <div className="testimonial__heading">
                      <GatsbyImage
                        image={testimonial.image.gatsbyImageData}
                        className="testimonial__image"
                      />
                      <div>
                        <h3 className="testimonial__name is-size-4">
                          {testimonial.name}
                        </h3>
                        <p className="testimonial__info is-size-5">
                          {testimonial.info}
                        </p>
                        <p className="testimonial__url is-size-5">
                          <a href={testimonial.url} target="_blank">
                            {testimonial.url}
                          </a>
                        </p>
                      </div>
                    </div>
                    <article className="testimonial__testimony">
                      <HTMLContent content={testimonial.testimony} />
                    </article>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </section>
    </Layout>
  );
}
