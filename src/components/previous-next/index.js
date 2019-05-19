import React from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/pro-light-svg-icons'
import { Columns, Container, Heading, Hero } from 'react-bulma-components'

export const PreviousNext = ({ next, previous }) => (
  <Hero className="prev-next-nav is-semi-light">
    <Hero.Body>
      <Container>
        <Columns className="has-text-centered-mobile">
          <Columns.Column size={4}>
            {next && (
              <React.Fragment>
                <Heading
                  size={6}
                  subtitle
                  className="has-text-weight-bold is-uppercase"
                >
                  Next
                </Heading>
                <Heading size={4} className="has-text-weight-light">
                  <Link className="link prev" to={next.frontmatter.path}>
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      className="is-size-6"
                    />
                  </Link>
                  <Link to={next.frontmatter.path}>
                    <span>{next.frontmatter.title}</span>
                  </Link>
                </Heading>
              </React.Fragment>
            )}
          </Columns.Column>
          {previous && next && <hr className="is-hidden-tablet" />}
          <Columns.Column
            size={4}
            offset={4}
            className="has-text-right-tablet has-text-centered-mobile"
          >
            {previous && (
              <React.Fragment>
                <Heading
                  subtitle
                  size={6}
                  className="has-text-weight-bold is-uppercase"
                >
                  Previous
                </Heading>
                <Heading size={4} className="has-text-weight-light">
                  <Link to={previous.frontmatter.path}>
                    <span>{previous.frontmatter.title}</span>
                  </Link>
                  <Link className="link next" to={previous.frontmatter.path}>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="is-size-6"
                    />
                  </Link>
                </Heading>
              </React.Fragment>
            )}
          </Columns.Column>
        </Columns>
      </Container>
    </Hero.Body>
  </Hero>
)

export default PreviousNext
