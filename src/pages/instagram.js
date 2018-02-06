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
    overflow: hidden;

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

export default class InstagramsPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <section className="section">
        <div className="container content">
          <h1 className="title is-size-4 has-text-weight-medium">
            Photos <small className="has-text-weight-light">&mdash; Instagrams</small>
          </h1>
          <div className="columns is-multiline">
            { posts
              .filter(post => post.node.frontmatter.templateKey === "instagram-post")
              .map(({ node: post }) => (
                <LinkItem className="column is-6-desktop is-4-widescreen" key={post.id}>
                  <a>
                    <div className="card">
                      <div className="card-image is-1by1">
                        {
                          post.frontmatter.image ?
                          <Img className="image" sizes={post.frontmatter.image.childImageSharp.sizes} />
                           :
                          <video className="video">
                            <source src={post.frontmatter.video} />
                          </video>
                        }
                      </div>
                      <div className="card-content">
                        <div className="content">
                          <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
                          {post.html}
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
  query InstagramsQuery {
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
            image {
              childImageSharp {
                sizes(
                  maxWidth: 1000,
                  maxHeight: 1000,
                  cropFocus: ENTROPY,
                ) {
                  ...GatsbyImageSharpSizes_withWebp
                }
              }
            }
            video
            username
          }
        }
      }
    }
  }
`;
