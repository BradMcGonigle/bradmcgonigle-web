import React from 'react'
import { Link } from 'gatsby'
import { Tag } from 'react-bulma-components'

export default function Tags({ list = [], ignore }) {
  let tags = list.filter(a => {
    return a !== ignore
  })
  tags = tags.sort() // Sort alphabetically
  return (
    <Tag.Group>
      {tags.map((tag, index) => {
        const tagSlug = tag.toLowerCase()

        return (
          <Link
            to={`/tags/${tagSlug}`}
            className="tag is-link has-text-weight-light is-capitalized"
            key={index}
          >
            {tag}
          </Link>
        )
      })}
    </Tag.Group>
  )
}
