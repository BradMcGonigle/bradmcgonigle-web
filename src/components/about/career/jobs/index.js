import React from 'react'
import { graphql } from 'gatsby'
import {
  Columns,
  Container,
  Heading,
  Hero,
  Image,
} from 'react-bulma-components'

import shuffleArray from '../../../../helpers/shuffle-array'

export default ({ jobs }) => (
  <Hero size="medium" color="light">
    <Hero.Body>
      <Container>
        <Columns>
          <Columns.Column className="has-text-centered">
            <Heading renderAs="h2" size={2} spaced>
              Work Experience
            </Heading>
            <Heading renderAs="h3" size={5} subtitle>
              I've been fortunate to work at some incredible companies.
            </Heading>
          </Columns.Column>
        </Columns>
        <Columns className="is-centered is-mobile">
          {shuffleArray(jobs).map(job => (
            <Columns.Column
              mobile={{ size: 'half' }}
              tablet={{ size: 'one-third' }}
            >
              <Image src={job.publicURL} alt={job.name} />
            </Columns.Column>
          ))}
        </Columns>
      </Container>
    </Hero.Body>
  </Hero>
)

export const jobsQuery = graphql`
  fragment jobsQuery on Query {
    jobs: allFile(filter: { relativePath: { regex: "/about/jobs/logos/" } }) {
      nodes {
        name
        publicURL
      }
    }
  }
`
