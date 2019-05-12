import React from 'react'
import { graphql } from 'gatsby'
import { Columns, Container, Heading, Hero, Image } from 'react-bulma-components'

export default ({ jobs }) => (
  <Hero size="medium" color="light">
    <Hero.Body>
      <Container>
        <Columns>
          <Columns.Column className="has-text-centered">
            <Heading renderAs="h2" size={2} spaced>Work Experience</Heading>
            <Heading renderAs="h3" size={5} subtitle>I've been fortunate to work at some incredible companies.</Heading>
          </Columns.Column>
        </Columns>
        <Columns>
          {jobs
            .map(job => (
              <Columns.Column
                mobile={{ size: 'half' }}
                tablet={{ size: 'one-quarter' }}
              >
                <Image src={job.publicURL} alt={job.name} className="is-3by2" />
              </Columns.Column>
            ))}
        </Columns>
      </Container>
    </Hero.Body>
  </Hero>
)

export const jobsQuery = graphql`
  fragment jobsQuery on Query {
    jobs: allFile(filter: { relativePath: { regex: "/career/jobs/logos/" } }) {
      nodes {
        name
        publicURL
      }
    }
  }
`
