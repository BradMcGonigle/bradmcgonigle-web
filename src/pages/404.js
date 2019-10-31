import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {
  Columns,
  Container,
  Content,
  Heading,
  Hero,
} from 'react-bulma-components'

import Layout from '../components/layout'

const NotFoundPage = () => (
  <Layout>
    <Hero className="is-fullheight is-bold is-primary">
      <Hero.Body>
        <Container>
          <Content>
            <Columns>
              <Columns.Column size={6}>
                <Heading size={1} className="has-text-weight-light">
                  404 &mdash; Page Not Found
                </Heading>
                <Heading
                  subtitle
                  size={3}
                  className="has-text-light has-text-weight-semibold"
                >
                  Well, this is embarrassing!
                </Heading>
                <p>We couldn't find the page you are looking for.</p>
                <p>
                  <a href="/" className="button is-light is-outlined">
                    <span className="icon">
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </span>{' '}
                    &nbsp; Go Home
                  </a>
                </p>
              </Columns.Column>
            </Columns>
          </Content>
        </Container>
      </Hero.Body>
    </Hero>
  </Layout>
)

export default NotFoundPage
