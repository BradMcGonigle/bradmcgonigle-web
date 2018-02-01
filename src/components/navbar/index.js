import React from 'react';
import Link from 'gatsby-link';
import styled from 'react-emotion';

import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faInstagram, faTwitter } from '@fortawesome/fontawesome-free-brands';


const Brand = styled('div')`
  a.navbar-item:hover {
    background-color: inherit!important;
  }
`;

const NavbarMenu = styled('div')`
  .navbar-item.site-nav {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    position: relative;
    transition: color .5s cubic-bezier(.19, 1, .22, 1);

    &:after {
      background-color: rgba(0, 0, 0, 0.025);
      bottom: 10%;
      content: "";
      height: 6px;
      left: 0;
      position: absolute;
      transform-origin: center top;
      transform: scaleX(0);
      transition: transform .5s cubic-bezier(.19, 1, .22, 1);
      width: 100%;
    }

    &:hover {
      &:after {
        transform: scaleX(1);
        transform-origin: center bottom
      }
    }
  }
`;

const SocialLink = styled('a')`
  padding-left: 0.33rem;
  padding-right: 0.33rem;
`;

const Navbar = () => (
  <nav className="navbar is-fixed-top is-transparent" role="navigation" aria-label="main navigation">
    <div className="container">
      <Brand className="navbar-brand">
        <Link to="/" className="navbar-item is-info">
          <strong>B &mdash; M.</strong>
        </Link>
        <div className="navbar-burger burger" data-target="navbar">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </Brand>
      <NavbarMenu id="navbar" className="navbar-menu">
        <div className="navbar-end">
          <Link className="navbar-item site-nav" to="/about">
            About
          </Link>
          <Link className="navbar-item site-nav" to="/blog">
            Blog
          </Link>
          <Link className="navbar-item site-nav" to="/links">
            Links
          </Link>
          <div className="navbar-item"></div>
          <SocialLink className="navbar-item" href="https://github.com/bradmcgonigle" rel="noopener noreferrer">
            <span className="icon"><FontAwesomeIcon icon={faGithub} inverse /></span>
          </SocialLink>
          <SocialLink className="navbar-item" href="https://instagram.com/bradmcgonigle" rel="noopener noreferrer">
            <span className="icon"><FontAwesomeIcon icon={faInstagram} inverse /></span>
          </SocialLink>
          <SocialLink className="navbar-item" href="https://twitter.com/bradmcgonigle" rel="noopener noreferrer">
            <span className="icon"><FontAwesomeIcon icon={faTwitter} inverse /></span>
          </SocialLink>
          <SocialLink className="navbar-item" href="https://facebook.com/bradmcgonigle" rel="noopener noreferrer">
            <span className="icon"><FontAwesomeIcon icon={faFacebook} inverse /></span>
          </SocialLink>
        </div>
      </NavbarMenu>
    </div>
  </nav>
);

export default Navbar;
