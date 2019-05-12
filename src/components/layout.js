import React from 'react'

import ContactForm from '../components/contact-form'
import Footer from '../components/footer'
import Navbar from '../components/navbar'

import './all.scss'

const Layout = ({ children }) => (
  <React.Fragment>
    <Navbar />
    <main>{children}</main>
    <footer>
      <ContactForm />
      <Footer />
    </footer>
  </React.Fragment>
)

export default Layout
