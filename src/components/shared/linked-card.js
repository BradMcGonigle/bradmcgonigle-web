import React from 'react'
import Img from 'gatsby-image'
import { Card, Heading } from 'react-bulma-components'

const LinkedCard = ({ post }) => {
  let url

  if (post.frontmatter.link) {
    url = post.frontmatter.link
  } else {
    url = post.frontmatter.path
  }

  return (
    <Card renderAs="a" href={url}>
      {post.frontmatter.image && (
        <Img
          fluid={post.frontmatter.image.childImageSharp.fluid}
          alt={post.frontmatter.image}
          className="card-image"
        />
      )}
      <Card.Content>
        {post.fields ? (
          <Heading
            renderAs="h5"
            size={6}
            subtitle
            className="has-text-grey-light"
          >
            {post.frontmatter.date} &mdash; {post.fields.readingTime.text}
          </Heading>
        ) : (
          <Heading
            renderAs="h5"
            size={6}
            subtitle
            className="has-text-grey-light"
          >
            {post.frontmatter.date}
          </Heading>
        )}
        <Heading renderAs="h2" size={5}>
          {post.frontmatter.title}
        </Heading>
        <Heading
          renderAs="h4"
          size={5}
          subtitle
          className="has-text-grey margin-bottom-025"
        >
          {post.frontmatter.description}
        </Heading>
      </Card.Content>
    </Card>
  )
}

export default LinkedCard
