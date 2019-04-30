import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-pro-light';

import Layout from '../components/layout'

const NotFoundPage = () => (
  <Layout>
    <div className={`hero is-fullheight is-bold is-primary`}>
      <div className="hero-body">
        <div className="container content">
          <div className="columns">
            <div className="column is-6">
              <h1 className="title has-text-weight-light">
                404 &mdash; Page Not Found
              </h1>
              <h2 className="subtitle has-text-light has-text-weight-semibold">
                Well, this is embarrassing!
              </h2>
              <p>
                We couldn't find the page you are looking for.
              </p>
              <p>
                <a href="/" className="button is-light is-outlined">
                  <span className="icon"><FontAwesomeIcon icon={faArrowLeft} /></span> &nbsp; Go Home
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
