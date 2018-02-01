import React from 'react';
import styled from 'react-emotion';
import graphql from 'graphql';

import Img from 'gatsby-image';

import Content, { HTMLContent } from '../components/content';

export const AboutPageTemplate = (
  { title, image, content, contentComponent }
) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section">
      <div className="container content">
        <div className="columns">
          <div className="column is-5">
            <Img className="image" sizes={image.childImageSharp.sizes} />
          </div>
          <div className="column is-6 is-offset-1">
            <h1 className="title">{title}</h1>
            <PageContent className="content" content={content} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ({ data }) => {
  const { markdownRemark: post } = data;
  console.log(data);

  return (<AboutPageTemplate
    contentComponent={HTMLContent}
    title={post.frontmatter.title}
    image={post.frontmatter.image}
    content={post.html}
  />);
};

export const aboutPageQuery = graphql`
  query AboutPage($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        image {
          childImageSharp {
            sizes(
              maxWidth: 1000,
              cropFocus: ENTROPY,
              quality: 90
            ) {
              ...GatsbyImageSharpSizes_withWebp
            }
          }
        }
      }
    }
  }
`;
