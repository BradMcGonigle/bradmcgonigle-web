import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navbar from '../components/navbar'

import './all.scss'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      htmlAttributes={{
        lang: 'en',
        class: 'html has-navbar-fixed-top',
      }}
      title="Brad McGonigle"
    />
    <Navbar />
    {children}
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.array,
}

export default TemplateWrapper
