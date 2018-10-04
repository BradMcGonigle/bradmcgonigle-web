import React from 'react';
import Img from "gatsby-image";
import Link from "gatsby-link";
import graphql from 'graphql';
import Helmet from 'react-helmet';
import styled from 'react-emotion';

import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faLink } from '@fortawesome/fontawesome-pro-light';

import Content, { HTMLContent } from '../components/content';

import Tags from '../components/tags';
import Footer from '../components/footer';


const Summary = styled('blockquote')`
  font-size: 0.85rem;
  margin-top: -1.25rem !important;
`;

const PostBody = styled('div')`
  margin-top: 1.5rem;
`;

export const LinkPostTemplate = ({
  content,
  contentComponent,
  helmet,
  html,
  title,
  summary,
  image,
  date,
  url,
  tags,
  next,
  prev,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <div>
      <section className="section">
        { helmet || ''}
        <div className="container content">
          <h1 className="title is-size-4 has-text-weight-medium">
            <Link to="/links" className="prev is-size-6"><FontAwesomeIcon icon={faChevronLeft} /></Link>
            <span>Links <small className="has-text-weight-light">&mdash; Interesting finds</small></span>
          </h1>
          <div className="columns">
            { image &&
              <div className="column is-4">
                <a href={url} title="{title}"><Img sizes={image.childImageSharp.sizes} /></a>
              </div>
            }
            <div className="column is-6">
              <h6 className="subtitle has-text-grey">{date}</h6>
              <h1 className="title">
                <a href={url} title="{title}">{title}</a>
              </h1>
              { summary && <Summary className="subtitle is-italic has-text-grey"><p>{summary}</p></Summary> }
              <PostBody>
                <PostContent content={content} />
              </PostBody>
              <Tags list={tags || []} ignore="link" />
            </div>
          </div>
        </div>
      </section>

      <section className="prev-next-nav hero is-semi-light">
        <div className="hero-body">
          <div className="container">
            <div className="columns has-text-centered-mobile">
              <div className="column is-4">
                {
                  next &&
                  <div>
                    <h6 className="subtitle is-size-7 has-text-weight-bold is-uppercase">
                      Next
                    </h6>
                    <h5 className="title is-size-4 has-text-weight-light">
                      <Link className="link prev" to={next.frontmatter.path}>
                        <FontAwesomeIcon icon={faChevronLeft} className="is-size-6" />
                      </Link>
                      <Link to={next.frontmatter.path}>
                        <span>{next.frontmatter.title}</span>
                      </Link>
                    </h5>
                  </div>
                }
              </div>
              { (prev && next) && <hr className="is-hidden-tablet" />}
              <div className="column is-4 is-offset-4 has-text-right-tablet has-text-centered-mobile">
                {
                  prev &&
                  <div>
                    <h6 className="subtitle is-size-7 has-text-weight-bold is-uppercase">
                      Previous
                    </h6>
                    <h5 className="title is-size-4 has-text-weight-light">
                      <Link to={prev.frontmatter.path}>
                        <span>{prev.frontmatter.title}</span>
                      </Link>
                      <Link className="link next" to={prev.frontmatter.path}>
                        <FontAwesomeIcon icon={faChevronRight} className="is-size-6" />
                      </Link>
                    </h5>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ({ data, pathContext }) => {
  const { markdownRemark: post } = data;
  const { next, prev } = pathContext;

  return (<LinkPostTemplate
    helmet={<Helmet title={`Links | ${post.frontmatter.title}`} />}
    content={post.html}
    contentComponent={HTMLContent}
    title={post.frontmatter.title}
    summary={post.frontmatter.summary}
    html={post.html}
    date={post.frontmatter.date}
    url={post.frontmatter.url}
    image={post.frontmatter.image}
    tags={post.frontmatter.tags}
    next={next}
    prev={prev}
  />);
};

export const pageQuery = graphql`
  query LinkPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        summary
        path
        date(formatString: "MMMM DD, YYYY")
        url
        image {
          childImageSharp {
            sizes(
              maxWidth: 1000,
            ) {
              ...GatsbyImageSharpSizes_withWebp
            }
          }
        }
        tags
      }
    }
  }
`;
