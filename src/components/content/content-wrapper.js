import React from 'react'
import { Content } from 'react-bulma-components'

const ContentWrapper = ({ content, className }) => (
  <Content className={className}>{content}</Content>
)

export default ContentWrapper
