import React from 'react'
import Img from 'gatsby-image'
import { Container } from 'react-bulma-components'

export const Image = ({ caption, image, isHero, url }) => (
  <figure class="image">
    <a href={url} title={caption}>
      <Img fluid={image} alt={caption} />
    </a>
    {isHero ? (
      <Container>
        <figcaption>
          <small>{caption}</small>
        </figcaption>
      </Container>
    ) : (
      <figcaption>
        <small>{caption}</small>
      </figcaption>
    )}
  </figure>
)

export default Image
