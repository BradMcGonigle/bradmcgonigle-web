import React from 'react'
import Img from 'gatsby-image'
import { Container } from 'react-bulma-components'

export const Image = ({ caption, image, isHero, url }) => (
  <figure class="image">
    {url ? (
      <a href={url} title={caption}>
        <Img fluid={image} alt={caption} />
      </a>
    ) : (
      <Img fluid={image} alt={caption} />
    )}
    {isHero ? (
      <Container>
        <figcaption>
          <small>
            <em>{caption}</em>
          </small>
        </figcaption>
      </Container>
    ) : (
      <figcaption>
        <small>
          <em>{caption}</em>
        </small>
      </figcaption>
    )}
  </figure>
)

export default Image
