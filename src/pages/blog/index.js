import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'
import { SectionHeader } from '../../components/core/Headers'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="section">
          <SectionHeader className="has-text-centered">
            Latest Stories
          </SectionHeader>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
