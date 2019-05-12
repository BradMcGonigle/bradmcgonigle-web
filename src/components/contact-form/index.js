import React from 'react'
import { Box, Columns, Container, Heading, Section } from 'react-bulma-components'
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/pro-light-svg-icons';

import { COLORS } from '../../constants/colors';
import { RandomColor } from '../../helpers/random-color'


const sectionColor = RandomColor(COLORS)

const OverlappedSection = styled(Section)`
  padding-bottom: 8rem;
  padding-top: 4rem;
`;

const OverlappingContent = styled(Box)`
  margin-top: -8rem;
  margin-bottom: 1rem;
`;

const ContactForm = () => (
  <React.Fragment>
    <OverlappedSection className={`has-background-${sectionColor} has-text-centered`}>
      <Container>
        <Heading className="has-text-light">Say Hi! <span role="img" aria-label="Waving Hand">👋</span></Heading>
        <Heading subtitle className="has-text-light">Or really just anything at all.</Heading>
      </Container>
    </OverlappedSection>
    <Section className="has-background-white-er">
      <Container>
        <Columns centered>
          <Columns.Column size="half">
            <OverlappingContent>
              <form name="contact" method="POST" data-netlify="true" action="/thanks">
                <div className="field" hidden>
                  <p>
                    <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <input className="input" placeholder="Name" name="name" type="text" />
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <input className="input" placeholder="Email" name="email" type="email" />
                  </p>
                </div>
                <div className="field">
                  <div className="control">
                    <textarea className="textarea" placeholder="Message" name="message" ></textarea>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button className={`button is-${sectionColor} is-outlined is-medium`} type="submit">
                      <span className="icon"><FontAwesomeIcon icon={faPaperPlane} /></span> &nbsp; Send
                    </button>
                  </div>
                </div>
              </form>
            </OverlappingContent>
          </Columns.Column>
        </Columns>
      </Container>
    </Section>
  </React.Fragment>
);

export default ContactForm;
