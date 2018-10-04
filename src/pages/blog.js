import React from "react";
import { Link } from 'gatsby';
import { graphql } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/fontawesome-pro-light';

import Layout from "../components/layout";


export default class BlogPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <Layout>
        <section className="section">
        <div className="container content">
          <div className="columns">
            <div className="column is-8">
              <h1 className="title is-size-4 has-text-weight-medium">
                Writings <small className="has-text-weight-light">&mdash; Thoughts on things</small>
              </h1>
              { posts
                .filter(post => post.node.frontmatter.templateKey === "blog-post")
                .map(({ node: post }, i, { length }) => (
                  <div className="content" key={post.id}>
                    <p className="has-text-weight-light margin-bottom-0"><small>{post.frontmatter.date}</small></p>
                    <h2 className="title has-text-weight-light margin-top-0">
                      <Link className="has-text-primary" to={post.frontmatter.path}>
                        {post.frontmatter.title}
                      </Link>
                    </h2>
                    <p>
                      {post.excerpt}
                      <br />
                      <br />
                      <Link className="button is-small is-info" to={post.frontmatter.path}>
                        <span>Keep Reading</span>
                        <span className="icon is-small">
                          <FontAwesomeIcon icon={faArrowRight} />
                        </span>
                      </Link>
                    </p>
                    { (i < length - 1) && <hr /> }
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        </section>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;
