import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'
import { GatsbyImage } from 'gatsby-plugin-image'

export const ProductsPageTemplate = ({
  title,
  productName,
  productDescription,
  productImage,
}) => {
  return (
    <section className="section">
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-1 has-text-weight-bold is-bold-light has-text-centered">
              {title}
            </h1>
            <h2 className="title is-size-2 has-text-weight-bold is-bold-light has-text-centered">
              {productName}
            </h2>
            <section className="columns" style={{ marginTop: '2rem' }}>
              <div className="column is-5">
                <HTMLContent
                  content={productDescription}
                  className="is-size-5"
                />
              </div>
              <div className="column is-7">
                {productImage && (
                  <GatsbyImage
                    image={productImage.gatsbyImageData}
                    alt={`Featured image for "${productName}" product`}
                    style={{
                      marginTop: `1rem`,
                      marginBottom: `2rem`,
                    }}
                  />
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}

ProductsPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  productDescription: PropTypes.object.isRequired,
  productImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

const ProductsPage = ({ data }) => {
  const { contentfulProductsPage } = data

  return (
    <Layout>
      <ProductsPageTemplate
        title={contentfulProductsPage.title}
        productName={contentfulProductsPage.productName}
        productDescription={contentfulProductsPage.productDescription}
        productImage={contentfulProductsPage.productImage}
      />
    </Layout>
  )
}

ProductsPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ProductsPage

export const productsPageQuery = graphql`
  query ProductsPage {
    contentfulProductsPage {
      title
      productName
      productDescription {
        raw
      }
      productImage {
        gatsbyImageData(
          layout: CONSTRAINED
          width: 1280
          placeholder: BLURRED
          formats: [AUTO, WEBP]
        )
      }
    }
  }
`
