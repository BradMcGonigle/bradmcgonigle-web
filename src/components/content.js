import React from 'react'
import { Content } from 'react-bulma-components'

export default ({ content, className }) => (
  <Content>{content}</Content>
)
export const HTMLContent = ({ content, className }) => (
  <Content dangerouslySetInnerHTML={{ __html: content }} />
)
