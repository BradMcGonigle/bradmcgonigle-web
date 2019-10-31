import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLink } from '@fortawesome/pro-light-svg-icons'
import { Card, Content, Heading } from 'react-bulma-components'

const LinkCard = styled(Card)`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .card-image {
    background-color: #eee;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.125);
    text-align: center;

    figure {
      height: 212px;
    }

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
      color: #575757;
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
`

const LinkItemCard = ({ post }) => (
  <LinkCard>
    <a
      href={post.frontmatter.url}
      title={post.frontmatter.title}
      className="card-image"
    >
      {post.frontmatter.image ? (
        <Img
          className="image"
          fluid={post.frontmatter.image.childImageSharp.fluid}
        />
      ) : (
        <figure className="is-hidden-mobile image">
          <span className="icon is-large">
            <FontAwesomeIcon icon={faExternalLink} />
          </span>
        </figure>
      )}
    </a>
    <Card.Content
      renderAs="a"
      href={post.frontmatter.url}
      title={post.frontmatter.title}
      className="card-content"
    >
      <Content>
        <time dateTime={post.frontmatter.date} className="has-text-grey-dark">
          {post.frontmatter.date}
        </time>
        <Heading size={5} subtitle className="margin-top-0">
          {post.frontmatter.title}
        </Heading>
      </Content>
    </Card.Content>
    <Card.Footer>
      <Link
        to={post.frontmatter.path}
        title="View Details"
        className="card-footer-item view"
      >
        View Details
      </Link>
    </Card.Footer>
  </LinkCard>
)

export default LinkItemCard
