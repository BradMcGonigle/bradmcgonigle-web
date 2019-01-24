import React from 'react'

import Layout from '../components/layout'

const NotFoundPage = () => (
  <Layout>
    <section className="section">
      <div className="container content">
        <div className="columns">
          <div className="column is-6">
            <h1 className="title has-text-weight-light">
              404 &mdash; Page Not Found
            </h1>
            <h4 className="has-text-weight-semibold margin-bottom-half">
              Well, this is embarrassing!
            </h4>
            <p>
              We couldn't find the page you are looking for. Most likely it
              doesn't exist.
            </p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default NotFoundPage
