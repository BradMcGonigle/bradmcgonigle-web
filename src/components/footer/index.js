import React from 'react';


const Footer = () => (
  <footer className="footer">
    <div className="container is-fluid">
      <div className="columns content">
        <div className="column is-6 has-text-centered-mobile">
          <p className="is-size-7 has-text-weight-light">&copy; {(new Date().getFullYear())}. All rights reserved.</p>
        </div>
        <div className="column is-6 has-text-right-tablet has-text-centered-mobile">
          <p className="is-size-7 has-text-weight-light">
            Built with <a href="http://www.gatsbyjs.org">Gatsby</a> and <a href="http://bulma.io">Bulma</a> running on <a href="https://netlify.com">Netlify</a>.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
