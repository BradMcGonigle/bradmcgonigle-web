import React from "react";
import Img from "gatsby-image";
import Link from "gatsby-link";
import graphql from "graphql";
import styled from 'react-emotion';

import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/fontawesome-pro-light';


const LinkItem = styled('div')`
  .card {
    height: 100%;

    .card-image {
      background-color: #eee;
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
      time {
        font-size: 0.875rem;
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
      <section className="section">
        <div className="container content">
          <h1 className="title is-size-4 has-text-weight-medium">
            Links <small className="has-text-weight-light">&mdash; Interesting finds</small>
          </h1>
          <div className="columns is-multiline">
            { posts
              .filter(post => post.node.frontmatter.templateKey === "link-post")
              .map(({ node: post }) => (
                <LinkItem className="column is-6-tablet is-4-desktop is-3-widescreen" key={post.id}>
                  <a href={post.frontmatter.url}>
                    <div className="card">
                      <div className="card-image">
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
                      </div>
                      <div className="card-content">
                        <div className="content">
                          <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
                          <h4>{post.frontmatter.title}</h4>
                        </div>
                      </div>
                    </div>
                  </a>
                </LinkItem>
              ))
            }
          </div>
        </div>
      </section>
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
            date(formatString: "MMMM DD, YYYY")
            url
            image {
              childImageSharp {
                sizes(
                  maxWidth: 1000,
                  maxHeight: 667,
                  cropFocus: ATTENTION
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
