import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";
import { SectionHeader, PageHeader } from "../components/core/Headers";
// import Text from '../components/core/Text'
import CallToAction from "../components/callToAction/CallToAction";
// import PlansOverview from '../components/PlansOverview'
import ContactForm from "../components/contact/ContactForm";
import HeroPageLayout from "../components/HeroPageLayout";
import { HTMLContent } from "../components/Content";
import { GatsbyImage } from "gatsby-plugin-image";
import FAQ from "../components/FAQ";
import PCISSCLogo from "../components/PCISSCLogo";
import PCISSCLogoNoGlobe from "../components/PCISSCLogoNoGlobe";

const IndexPageTemplate = ({
  image,
  mainpitch,
  introHeading,
  introSubheading,
  introDescription,
  whyHeading,
  whyDescription,
  whyImage,
  why,
  pricing,
  featuresTitle,
  features,
  isPreview = false,
}) => {
  return (
    <HeroPageLayout
      heroImage={image}
      heroContent={
        <div className="mainPage__pitch">
          <div style={{ maxWidth: "500px" }}>
            <PageHeader className="mainPage__title">
              <span style={{ backgroundColor: `rgba(0, 0, 0, 0.5)` }}>
                {mainpitch}
              </span>
            </PageHeader>
          </div>
          <ContactForm className="quickForm--home is-hidden-mobile" />
        </div>
      }
      heroImageClassName="mainPage__heroImage"
    >
      <section className="section section--gradient">
        <div className="container">
          <div className="">
            <div className="">
              <div className="">
                <div
                  className="intro__container"
                  style={{ marginTop: "2rem", marginBottom: "80px" }}
                >
                  <div>
                    <SectionHeader
                      intro={introHeading}
                      className="has-text-left"
                      style={{ maxWidth: "755px" }}
                    >
                      {introSubheading}
                    </SectionHeader>
                    <HTMLContent
                      content={introDescription}
                      className="intro__description"
                    />
                    <Link className="btn" to="/contact">
                      Get Started
                      <span className="icon">
                        <i className="fas fa-arrow-right" />
                      </span>
                    </Link>
                  </div>
                  <div className="intro__pciLogo" style={{ flexGrow: 1 }}>
                    <div style={{ textAlign: "center" }}>
                      <PCISSCLogoNoGlobe
                        style={{ height: "80px", marginBottom: "12px" }}
                      />
                      <h4
                        className="has-text-brand is-size-6"
                        style={{ maxWidth: "224px", margin: "0 auto" }}
                      >
                        Associate participating organization
                      </h4>
                    </div>
                  </div>
                </div>
                <SectionHeader
                  className="has-text-left"
                  style={{ marginBottom: "28px" }}
                >
                  {whyHeading}
                </SectionHeader>
                <div className="mainFeaturesSection">
                  <SectionHeader>{featuresTitle}</SectionHeader>
                  <div className="mainFeaturesConnector" />
                  <ul className="mainFeatures">
                    {features.map((feature, idx) => {
                      return (
                        <li key={feature.heading}>
                          <div
                            className={`mainFeature ${
                              idx % 2 === 0 ? `even` : `odd`
                            }`}
                          >
                            <section className="mainFeature__summary">
                              <h3
                                className="has-text-left is-size-4"
                                style={{
                                  lineHeight: 1.5,
                                  marginBottom: "1.5rem",
                                }}
                              >
                                {feature.heading}
                              </h3>
                              <HTMLContent content={feature.description} />
                            </section>
                            <div>
                              <div className="mainFeature__imageContainer">
                                <GatsbyImage
                                  image={feature.image.gatsbyImageData}
                                  alt=""
                                  className="mainFeature__image"
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div style={{ marginTop: "4rem", marginBottom: "4rem" }}>
                  <SectionHeader
                    className="has-text-left"
                    style={{ marginBottom: "1rem" }}
                  >
                    Latest Stories
                  </SectionHeader>
                  <BlogRoll count={3} />
                  <div className="has-text-centered">
                    <Link
                      className="button is-outlined is-primary"
                      to="/blog"
                      aria-label="View all blog entries"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
                <div style={{ marginTop: "4rem", marginBottom: "4rem" }}>
                  <SectionHeader
                    className="has-text-left"
                    style={{ marginBottom: "1rem" }}
                  >
                    FAQ
                  </SectionHeader>
                  <FAQ />
                </div>

                {/* <div className="pricing-section">
                  <div
                    className="background"
                    style={{
                      backgroundImage: `url(${
                        !!pricing.image.childImageSharp
                          ? pricing.image.childImageSharp.fluid.src
                          : pricing.image
                      })`,
                    }}
                  ></div>
                  <SectionHeader className="has-text-white has-text-centered">
                    {pricing.heading}
                  </SectionHeader>
                  {!isPreview && <PlansOverview variant="HOME" />}
                </div> */}
                {!isPreview && <CallToAction />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </HeroPageLayout>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  mainpitch: PropTypes.string,
  introHeading: PropTypes.string,
  introSubheading: PropTypes.string,
  introDescription: PropTypes.object,
  whyHeading: PropTypes.string,
  whyDescription: PropTypes.object,
  whyImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  featuresTitle: PropTypes.string,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.object,
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    })
  ),
};

const IndexPage = ({ data }) => {
  const { contentfulLandingPage } = data;

  return (
    <Layout>
      <IndexPageTemplate
        image={contentfulLandingPage.heroImage}
        mainpitch={contentfulLandingPage.mainPitch}
        introHeading={contentfulLandingPage.introHeading}
        introSubheading={contentfulLandingPage.introSubheading}
        introDescription={contentfulLandingPage.introDescription}
        whyHeading={contentfulLandingPage.whyHeading}
        whyDescription={contentfulLandingPage.whyDescription}
        whyImage={contentfulLandingPage.whyImage}
        featuresTitle={contentfulLandingPage.featuresTitle}
        features={contentfulLandingPage.features}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    contentfulLandingPage: PropTypes.object,
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query LandingPage {
    contentfulLandingPage {
      mainPitch
      heroImage {
        gatsbyImageData(
          layout: FULL_WIDTH
          placeholder: BLURRED
          formats: [AUTO, WEBP]
        )
      }
      introHeading
      introSubheading
      introDescription {
        raw
      }
      whyHeading
      whyDescription {
        raw
      }
      whyImage {
        gatsbyImageData(
          height: 800
          placeholder: BLURRED
          formats: [AUTO, WEBP]
        )
      }
      features {
        heading
        description {
          raw
        }
        image {
          gatsbyImageData(
            width: 840
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
        }
      }
    }
  }
`;
