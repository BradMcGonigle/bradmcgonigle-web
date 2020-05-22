import React from 'react'
import styled from 'styled-components'
import {
  Columns,
  Container,
  Content,
  Heading,
  Hero,
} from 'react-bulma-components'

import BlogRecentPosts from '../components/blog/recent-posts'
import Layout from '../components/layout'
import LinksRecentLinks from '../components/links/recent-links'
import SEO from '../components/seo'

import { COLORS } from '../constants/colors'
import { RandomColor } from '../helpers/random-color'

const backgroundColor = RandomColor(COLORS)

const HeroWrapper = styled(Hero)`
  margin-top: -52px;
  padding-top: 52px;
`

const Intro = () => (
  <HeroWrapper size="medium" className={`is-${backgroundColor} is-bold`}>
    <Hero.Body>
      <Container>
        <Columns>
          <Columns.Column size={4}>
            <Content>
              <Heading>
                <span role="img" aria-label="Waving Hand">
                  👋
                </span>
              </Heading>
              <Heading renderAs="h2" subtitle>
                Hi, I'm Brad.
              </Heading>
              <p>
                I'm a software developer from Orlando,
                Florida building things on the internet.
              </p>
            </Content>
          </Columns.Column>
        </Columns>
      </Container>
    </Hero.Body>
  </HeroWrapper>
)

export default class IndexPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Layout>
          <SEO title="Home" />
          <Intro />
          <BlogRecentPosts />
          <LinksRecentLinks />
        </Layout>
      </React.Fragment>
    )
  }
}
