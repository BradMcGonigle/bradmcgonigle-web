import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Footer from '../components/footer';
import Navbar from '../components/navbar';

import './all.scss';


const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      htmlAttributes={{
        lang: 'en',
        class: 'has-navbar-fixed-top',
        style: 'background-color: whitesmoke',
      }}
      bodyAttributes={{
        style: 'background-color: white',
      }}
      title="Brad McGonigle"
    />
    <Navbar />
    {children()}
    <Footer />
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
