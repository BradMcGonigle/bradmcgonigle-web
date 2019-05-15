import React from 'react'
import { Content } from 'react-bulma-components'

const HTMLContent = ({ content, className }) => (
  <Content className={className} dangerouslySetInnerHTML={{ __html: content }} />
)

export default HTMLContent
