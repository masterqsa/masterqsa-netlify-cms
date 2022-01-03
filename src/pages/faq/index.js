import React from 'react'

import Layout from '../../components/Layout'
import { SectionHeader } from '../../components/core/Headers'
import FAQ from '../../components/FAQ'

export default class FAQIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="section">
          <SectionHeader className="has-text-centered">FAQ</SectionHeader>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <FAQ />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
