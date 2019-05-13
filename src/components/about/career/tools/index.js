import React from 'react'
import { Columns, Container, Content, Heading, Hero } from 'react-bulma-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBracketsCurly, faLanguage } from '@fortawesome/pro-light-svg-icons';

import shuffleArray from '../../../../helpers/shuffle-array';

import {
  Css3Logo,
  Html5Logo,
  FigmaLogo,
  GitLogo,
  GruntLogo,
  GulpLogo,
  InvisionLogo,
  JasmineLogo,
  JavascriptLogo,
  JestLogo,
  NpmLogo,
  ReactLogo,
  ReduxLogo,
  SassLogo,
  SketchLogo,
  WebpackLogo,
  YarnLogo,
} from './logos';

const LanguageIcons = [
  { name: "HTML5", svg: Html5Logo },
  { name: "CSS3", svg: Css3Logo },
  { name: "Javascript", svg: JavascriptLogo },
]

const ToolLogos = [
  { name: "Figma", svg: FigmaLogo },
  { name: "Git", svg: GitLogo },
  { name: "Grunt", svg: GruntLogo },
  { name: "Gulp", svg: GulpLogo },
  { name: "Invision", svg: InvisionLogo },
  { name: "Jasmine", svg: JasmineLogo },
  { name: "Jest", svg: JestLogo },
  { name: "NPM", svg: NpmLogo },
  { name: "React", svg: ReactLogo },
  { name: "Redux", svg: ReduxLogo },
  { name: "Sass", svg: SassLogo },
  { name: "Sketch", svg: SketchLogo },
  { name: "Webpack", svg: WebpackLogo },
  { name: "Yarn", svg: YarnLogo },
]

const Icon = ({ icon }) => (
  <Columns.Column size={2} className="has-text-centered">
    <span className="icon is-large">
      <img alt={icon.name} src={icon.svg} className="is-paddingless background-transparent" />
    </span>
    <Heading renderAs="p" size={6} subtitle className="has-text-grey-light">{icon.name}</Heading>
  </Columns.Column>
)

export default () => (
  <Hero>
    <Hero.Body>
      <Container className="has-text-centered">
        <Content>
          <Heading renderAs="h2" size={2} spaced>Development Expertise</Heading>
          <Heading renderAs="h4" size={5} subtitle>Experienced in a wide variety for languages, frameworks, tools and services.</Heading>
          <Columns centered>
            <Columns.Column size="half" className="has-text-centered">
              <div className="padding-3rem">
                <p><span className="icon is-large has-text-grey-light"><FontAwesomeIcon icon={faLanguage} size="4x" /></span></p>
                <Heading renderAs="h4" size={6} subtitle className="has-text-weight-semibold has-text-grey">Languages</Heading>
              </div>
              <Columns centered>
                {LanguageIcons
                  .map(icon => (
                    <Icon icon={icon} />
                  ))
                }
              </Columns>
            </Columns.Column>
            <Columns.Column size="half" className="has-text-centered">
              <div className="padding-3rem">
                <p><span className="icon is-large has-text-grey-light"><FontAwesomeIcon icon={faBracketsCurly} size="4x" /></span></p>
                <Heading renderAs="h4" size={6} subtitle className="has-text-weight-semibold has-text-grey">Frameworks &amp; Tools</Heading>
              </div>
              <Columns centered>
                {shuffleArray(ToolLogos)
                  .map(icon => (
                    <Icon icon={icon} />
                  ))
                }
              </Columns>
            </Columns.Column>
          </Columns>
        </Content>
      </Container>
    </Hero.Body>
  </Hero>
)
