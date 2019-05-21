import React from 'react'
import Img from 'gatsby-image'
import styled from '@emotion/styled'
import { Card, Heading } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog, faLink } from '@fortawesome/pro-light-svg-icons'

const CardHeader = styled(Card.Header)`
  background-color: #f3f3f3;
`

const CardHeaderTitle = styled(Card.Header.Title)`
  font-size: 0.85rem;
  padding: 0.25em 0.75em;
`

const CardHeaderIcon = styled(Card.Header.Icon)`
  font-size: 0.85rem;
  padding: 0.25em 0.75em;
`

const LinkedCard = ({ post }) => {
  let date
  let icon
  let type
  let url

  if (post.frontmatter.templateKey === 'blog-post') {
    date = `${post.frontmatter.date} — ${post.fields.readingTime.text}`
    icon = faBlog
    type = 'Blog Post'
  } else {
    date = post.frontmatter.date
    icon = faLink
    type = 'Link'
  }

  if (post.frontmatter.link) {
    url = post.frontmatter.link
  } else {
    url = post.frontmatter.path
  }

  return (
    <Card renderAs="a" href={url}>
      <CardHeader>
        <CardHeaderTitle>{type}</CardHeaderTitle>
        <CardHeaderIcon>
          <FontAwesomeIcon icon={icon} />
        </CardHeaderIcon>
      </CardHeader>
      {post.frontmatter.image && (
        <Img
          fluid={post.frontmatter.image.childImageSharp.fluid}
          caption={post.frontmatter.image}
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
            {date}
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
        {post.frontmatter.templateKey === 'blog-post' && (
          <Heading
            renderAs="p"
            size={6}
            subtitle
            className="has-text-grey margin-bottom-025"
          >
            {post.frontmatter.description}
          </Heading>
        )}
      </Card.Content>
    </Card>
  )
}

export default LinkedCard
