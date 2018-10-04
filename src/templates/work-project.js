import React from 'react';
import Img from "gatsby-image";
import { Link } from 'gatsby';
import { graphql } from 'gatsby'
import Helmet from 'react-helmet';
import styled from 'react-emotion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/fontawesome-pro-light';

import { HTMLContent } from '../components/content';

import Footer from '../components/footer';
import Layout from "../components/layout";


const ProjectBannerSection = styled('section')`
  position: relative;
  overflow: hidden;
  background-image: url('${props => props.src}');
  background-position: center center;
  background-size: cover;
`

const ProjectBanner = ({featuredBackground, logo, title}) => (
  <ProjectBannerSection
    className="hero is-medium"
    src={featuredBackground.childImageSharp.fluid.src}
  >
    <div className="hero-body">
      <div className="container content">
        <div className="columns">
          { logo &&
            <div className="column is-4 is-10-mobile">
              <Img
                fadeIn="false"
                fluid={logo.childImageSharp.fluid}
                title={title}
              />
            </div>
          }
        </div>
      </div>
    </div>
  </ProjectBannerSection>
)

export const WorkProjectTemplate = ({
  content,
  contentComponent,
  contribution,
  date,
  helmet,
  html,
  image,
  featuredBackground,
  logo,
  lifespan,
  technologies,
  next,
  prev,
  skills,
  summary,
  tags,
  title,
  type,
  url,
}) => {
  let hasHero = false;
  if (featuredBackground && logo) {
    hasHero = true;
  }

  return (
    <div>
      <Layout>
        <section className="section">
          { helmet || ''}
          <div className="container content">
            <h1 className="title is-size-4 has-text-weight-medium">
              <Link to="/work" className="prev is-size-6"><FontAwesomeIcon icon={faChevronLeft} /></Link>
              <span>Work <small className="has-text-weight-light">&mdash; A small collection of projects</small></span>
            </h1>
          </div>
        </section>
        <div>
          { hasHero && <ProjectBanner featuredBackground={featuredBackground} logo={logo} title={title} /> }
        </div>
        <section className="section">
          <div className="container content">
            <div className="columns">
              { (image) &&
                <div className="column is-3">
                  <a href={url} title={title}><Img fluid={image.childImageSharp.fluid} title={title} /></a>
                </div>
              }
              <div className="column">
                <h1 className="title"><a className="has-text-weight-light has-text-dark" href={url} title={title}>{title}</a></h1>
                { summary && <p>{summary}</p> }
                <hr />
                <div className="columns">
                  <div className="column">
                    <p className="heading is-uppercase has-text-weight-light">Product Type</p>
                    <p>{type}</p>
                  </div>
                  <div className="column">
                    <p className="heading is-uppercase has-text-weight-light">Lifespan</p>
                    <p>{lifespan}</p>
                  </div>
                  <div className="column">
                    <p className="heading is-uppercase has-text-weight-light">Contribution</p>
                    <p>{contribution}</p>
                  </div>
                  <div className="column">
                    <p className="heading is-uppercase has-text-weight-light">technologies</p>
                    <p>{technologies}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column content">
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </Layout>
    </div>
  );
};

export default ({ data }) => {
  const { markdownRemark: post } = data;

  return (<WorkProjectTemplate
    helmet={<Helmet title={`Work | ${post.frontmatter.title}`} />}
    content={post.html}
    contentComponent={HTMLContent}
    title={post.frontmatter.title}
    summary={post.frontmatter.summary}
    html={post.html}
    url={post.frontmatter.url}
    image={post.frontmatter.image}
    featuredBackground={post.frontmatter.featuredBackground}
    logo={post.frontmatter.logo}
    type={post.frontmatter.type}
    lifespan={post.frontmatter.lifespan}
    contribution={post.frontmatter.contribution}
    technologies={post.frontmatter.technologies}
    tags={post.frontmatter.tags}
  />);
};

export const pageQuery = graphql`
  query WorkProjectByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        summary
        path
        date(formatString: "MMMM DD, YYYY")
        url
        featuredBackground {
          childImageSharp {
            fluid(
              maxWidth: 1000,
            ) {
              src
            }
          }
        }
        logo {
          childImageSharp {
            fluid(
              maxWidth: 1000,
            ) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        image {
          childImageSharp {
            fluid(
              maxWidth: 1000,
            ) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        type
        lifespan
        contribution
        technologies
        tags
      }
    }
  }
`;
