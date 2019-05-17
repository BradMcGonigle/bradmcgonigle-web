import React from 'react'
import { Tag } from 'react-bulma-components'

export default function Tags({ list = [], ignore }) {
  let tags = list.filter(a => {
    return a !== ignore
  })
  tags = tags.sort() // Sort alphabetically
  return (
    <Tag.Group>
      {tags.map((tag, index) => (
        <Tag className="has-text-weight-light is-lowercase" key={index}>
          {tag}
        </Tag>
      ))}
    </Tag.Group>
  )
}
