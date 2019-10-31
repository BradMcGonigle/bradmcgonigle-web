import React from 'react'
import { Link } from 'gatsby'
import { Heading } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

class SectionHeader extends React.Component {
  render() {
    const { isSubSection, link, section, tagline } = this.props

    let sectionTitle = section

    if (isSubSection) {
      sectionTitle = <Link to={link}>{sectionTitle}</Link>
    }

    return (
      <Heading renderAs="h2" size={4} className="has-text-weight-medium">
        {link && !isSubSection && (
          <Link
            to={link}
            className="next is-size-6"
            title="Return to previous page"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Link>
        )}
        <span>
          {sectionTitle}
          <small className="has-text-weight-light"> &mdash; {tagline}</small>
        </span>
      </Heading>
    )
  }
}

export default SectionHeader
