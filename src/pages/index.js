import React from 'react'
import styled from '@emotion/styled'

import Layout from '../components/layout'
import BlogRecentPosts from '../components/blog/recent-posts'
import LinksRecentLinks from '../components/links/recent-links'
import SEO from '../components/seo'

import { COLORS } from '../constants/colors';
import { RandomColor } from '../helpers/random-color'


const backgroundColor = RandomColor(COLORS)

const HeroWrapper = styled('div')`
  margin-top: -52px;
`

const Hero = () => (
  <HeroWrapper className={`hero is-medium is-bold is-${backgroundColor}`}>
    <div className="hero-body">
      <div className="container">
        <div className="columns">
          <div className="column is-5 content">
            <h1 className="title is-size-1">
              <span role="img" aria-label="Waving Hand">
                👋
              </span>
            </h1>
            <h2 className="subtitle">Hi, I'm Brad.</h2>
            <p>
              I'm a frontend developer and product designer from Orlando,
              Florida building things on the internet.
            </p>
          </div>
        </div>
      </div>
    </div>
  </HeroWrapper>
)

export default class IndexPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Layout>
          <SEO
            title="Home"
          />
          <Hero />
          <BlogRecentPosts />
          <LinksRecentLinks />
        </Layout>
      </React.Fragment>
    )
  }
}
