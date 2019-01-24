import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { Navbar } from 'react-bulma-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faInstagram, faTwitter } from '@fortawesome/fontawesome-free-brands';


const NavbarWrapper = styled(Navbar)`
  backdrop-filter: saturate(200%) blur(25px);
  background-color: rgba(255, 255, 255, 0.75);
`;

const SocialLink = styled(Navbar.Item)`
  padding-left: 0.33rem;
  padding-right: 0.33rem;

  &:last-child {
    padding-right: 1rem;
  }
`;

const Nav = () => (
  <NavbarWrapper className="is-fixed-top is-transparent" role="navigation" aria-label="main navigation">
    <Navbar.Brand>
      <Link to="/" className="navbar-item is-info">
        <strong>B &mdash; M.</strong>
      </Link>
      <Navbar.Burger />
    </Navbar.Brand>
    <Navbar.Menu>
      <Navbar.Container position="end" className="has-text-centered-mobile">
        <Link to="/about" className="navbar-item site-nav">About</Link>
        <Link to="/work" className="navbar-item site-nav">Work</Link>
        <Link to="/links" className="navbar-item site-nav">Links</Link>
        <Navbar.Item className="is-hidden-mobile"></Navbar.Item>
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
      </Navbar.Container>
    </Navbar.Menu>
  </NavbarWrapper>
);

export default Nav;
