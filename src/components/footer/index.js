import React from 'react'
import { Link } from 'gatsby'
import { Columns, Container, Footer } from 'react-bulma-components'

import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faInstagram, faTwitter } from '@fortawesome/fontawesome-free-brands';


const FooterNav = styled(Columns.Column)`
  p {
    margin-bottom: 0 !important;
  }
`;

const ObfuscatedEmail = styled('span')`
  unicode-bidi:bidi-override;
  direction: rtl;
`;

const NavLink = styled(Link)`
  padding-left: 1rem;
  padding-right: 1rem;

  &:first-child {
    padding-left: 0;
  }
`;

const SocialLink = styled('a')`
  padding-left: 0.33rem;
  padding-right: 0.33rem;
`;

const SiteFooter = () => (
  <Footer>
    <Container fluid>
      <Columns className="content">
        <FooterNav size={8} className="has-text-centered-mobile">
          <h4>Want to get in touch?</h4>
          <p className="is-size-6">Shoot me an email at <a href="mailto:brad@bradmcgonigle.com"><ObfuscatedEmail>moc.elginogcmdarb@darb</ObfuscatedEmail></a></p>
          <hr />
          <p className="is-size-4">
            <NavLink to="/about">About</NavLink>
            <NavLink to="/work">Work</NavLink>
            <NavLink to="/links">Links</NavLink>
          </p>
        </FooterNav>
        <Columns.Column size={4} className="has-text-right-tablet has-text-centered-mobile">
          <p className="is-size-5 has-text-weight-light">
            <SocialLink href="https://github.com/bradmcgonigle" rel="noopener noreferrer">
              <span className="icon"><FontAwesomeIcon icon={faGithub} /></span>
            </SocialLink>
            <SocialLink href="https://instagram.com/bradmcgonigle" rel="noopener noreferrer">
              <span className="icon"><FontAwesomeIcon icon={faInstagram} /></span>
            </SocialLink>
            <SocialLink href="https://twitter.com/bradmcgonigle" rel="noopener noreferrer">
              <span className="icon"><FontAwesomeIcon icon={faTwitter} /></span>
            </SocialLink>
            <SocialLink href="https://facebook.com/bradmcgonigle" rel="noopener noreferrer">
              <span className="icon"><FontAwesomeIcon icon={faFacebook} /></span>
            </SocialLink>
          </p>
          <p className="is-size-6 has-text-weight-light">&copy; {(new Date().getFullYear())}. All rights reserved.</p>
          <p className="is-size-6 has-text-weight-light">
            Built with <a href="http://www.gatsbyjs.org">Gatsby</a> and <a href="http://bulma.io">Bulma</a> running on <a href="https://netlify.com">Netlify</a>.
          </p>
        </Columns.Column>
      </Columns>
    </Container>
  </Footer>
);

export default SiteFooter;
