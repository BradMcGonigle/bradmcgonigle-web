import React from 'react';
import graphql from 'graphql';
import Helmet from 'react-helmet';

import Content, { HTMLContent } from '../components/content';


export const InstagramPostTemplate = ({
  content, contentComponent, description, title, helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      { helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10">
            <h1 className="title">{title}</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ({ data }) => {
  const { markdownRemark: post } = data;

  return (<InstagramPostTemplate
    helmet={<Helmet title={`Blog | ${post.frontmatter.title}`} />}
    title={post.frontmatter.title}
  />);
};

export const pageQuery = graphql`
  query InstagramPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`;
