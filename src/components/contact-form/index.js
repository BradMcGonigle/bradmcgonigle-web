import React from 'react'
import {
  Box,
  Columns,
  Container,
  Heading,
  Section,
} from 'react-bulma-components'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/pro-light-svg-icons'

import { COLORS } from '../../constants/colors'
import { RandomColor } from '../../helpers/random-color'

const sectionColor = RandomColor(COLORS)

const OverlappedSection = styled(Section)`
  padding-bottom: 8rem;
  padding-top: 4rem;
`

const OverlappingContent = styled(Box)`
  margin-top: -8rem;
  margin-bottom: 1rem;
`

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

class ContactForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: '', email: '', message: '', isFormSubmitted: false }
  }

  handleSubmit = e => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...this.state }),
    })
      .then(() => this.setState({ isFormSubmitted: true }))
      .catch(error => alert(error))

    e.preventDefault()
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { name, email, message, isFormSubmitted } = this.state
    return (
      <React.Fragment>
        <OverlappedSection
          className={`has-background-${sectionColor} has-text-centered`}
        >
          <Container>
            <Heading className="has-text-light">
              Say Hi!{' '}
              <span role="img" aria-label="Waving Hand">
                👋
              </span>
            </Heading>
            <Heading subtitle className="has-text-light">
              Or really just anything at all {isFormSubmitted}.
            </Heading>
          </Container>
        </OverlappedSection>
        <Section className="has-background-white-er">
          <Container>
            <Columns centered>
              <Columns.Column size="half">
                <OverlappingContent>
                  {isFormSubmitted ? (
                    <div>
                      <Heading size={3} className="has-text-weight-light">
                        Thanks for getting in touch!
                      </Heading>
                      <Heading subtitle size={4}>
                        We'll talk soon even if it's just to say hi.
                      </Heading>
                    </div>
                  ) : (
                    <form
                      onSubmit={this.handleSubmit}
                      name="contact"
                      method="POST"
                      data-netlify="true"
                      data-netlify-honeypot="bot-field"
                    >
                      <div className="field" hidden>
                        <p>
                          <label>
                            Don’t fill this out if you're human:{' '}
                            <input
                              type="hidden"
                              name="form-name"
                              value="contact"
                            />
                          </label>
                        </p>
                      </div>
                      <div className="field" hidden>
                        <p>
                          <label>
                            Don’t fill this out if you're human:{' '}
                            <input name="bot-field" />
                          </label>
                        </p>
                      </div>
                      <div className="field">
                        <p className="control">
                          <input
                            className="input"
                            placeholder="Name"
                            name="name"
                            required
                            type="text"
                            value={name}
                            onChange={this.handleChange}
                          />
                        </p>
                      </div>
                      <div className="field">
                        <p className="control">
                          <input
                            className="input"
                            placeholder="Email"
                            name="email"
                            required
                            type="email"
                            value={email}
                            onChange={this.handleChange}
                          />
                        </p>
                      </div>
                      <div className="field">
                        <div className="control">
                          <textarea
                            className="textarea"
                            placeholder="Message"
                            name="message"
                            required
                            value={message}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          <button
                            className={`button is-${sectionColor} is-outlined is-medium`}
                            type="submit"
                          >
                            <span className="icon">
                              <FontAwesomeIcon icon={faPaperPlane} />
                            </span>{' '}
                            &nbsp; Send
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </OverlappingContent>
              </Columns.Column>
            </Columns>
          </Container>
        </Section>
      </React.Fragment>
    )
  }
}

export default ContactForm
