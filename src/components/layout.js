import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navbar from '../components/navbar'

import './all.scss'

const TemplateWrapper = ({ children }) => (
  <React.Fragment>
    <Helmet
      htmlAttributes={{
        lang: 'en',
        class: 'html has-navbar-fixed-top',
      }}
      title="Brad McGonigle"
    />
    <Navbar />
    {children}
  </React.Fragment>
)

TemplateWrapper.propTypes = {
  children: PropTypes.array,
}

export default TemplateWrapper
