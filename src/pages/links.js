import React from "react";
import Img from "gatsby-image";
import Link from "gatsby-link";
import graphql from "graphql";
import styled from 'react-emotion';

import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faExternalLink, faShare } from '@fortawesome/fontawesome-pro-light';
import { faFacebook, faTwitter } from '@fortawesome/fontawesome-free-brands';

import Footer from '../components/footer';


const LinkItem = styled('div')`
  .card {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .card-image {
      background-color: #eee;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.125);
      text-align: center;

      span.icon {
        bottom: 0;
        color: #e7e7e7;
        font-size: 3rem;
        height: 100%;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transition: 250ms color ease-in-out;
        width: 100%;
      }
    }

    .card-content {
      flex-grow: 1;

      time {
        font-size: 0.875rem;
      }
    }

    .card-footer {
      background-color: #fcfcfc;
      font-size: 0.8rem;

      a {
        color: #999;
      }

      .card-footer-item {
        flex-grow: 0;
        padding-bottom: 0.33rem;
        padding-top: 0.33rem;
      }

      .view {
        flex-grow: 1;

        &:hover {
          background-color: #f6f6f6;
        }
      }
    }

    &:hover {
      .card-image {
        span.icon {
          color: #e1e1e1;
        }
      }
    }
  }
`

export default class LinksPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <div>
        <section className="section">
          <div className="container content">
            <h1 className="title is-size-4 has-text-weight-medium">
              <span>Links <small className="has-text-weight-light">&mdash; Interesting finds from around the web</small></span>
            </h1>
            <div className="columns is-multiline">
              { posts
                .filter(post => post.node.frontmatter.templateKey === "link-post")
                .map(({ node: post }) => (
                  <LinkItem className="column is-6-tablet is-4-desktop is-3-widescreen" key={post.id}>
                    <div className="card">
                      <a href={post.frontmatter.url} title={post.frontmatter.title} className="card-image">
                        {
                          post.frontmatter.image ?
                          <Img className="image" sizes={post.frontmatter.image.childImageSharp.sizes} />
                           :
                          <figure className="is-hidden-mobile image is-3by2">
                            <span className="icon is-large">
                              <FontAwesomeIcon icon={faExternalLink} />
                            </span>
                          </figure>
                        }
                      </a>
                      <a href={post.frontmatter.url} title={post.frontmatter.title} className="card-content">
                        <div className="content">
                          <time dateTime={post.frontmatter.date} className="has-text-grey">{post.frontmatter.date}</time>
                          <h4>{post.frontmatter.title}</h4>
                        </div>
                      </a>
                      <footer className="card-footer">
                        <Link to={post.frontmatter.path} title="View Details" className="card-footer-item view">View Details</Link>
                      </footer>
                    </div>
                  </LinkItem>
                ))
              }
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export const pageQuery = graphql`
  query LinksQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 400)
          html
          frontmatter {
            title
            templateKey
            path
            date(formatString: "MMMM DD, YYYY")
            url
            image {
              childImageSharp {
                sizes(
                  maxWidth: 1000,
                  maxHeight: 667,
                  cropFocus: ENTROPY,
                ) {
                  ...GatsbyImageSharpSizes_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;
