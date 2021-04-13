import React from 'react'
import PropTypes from 'prop-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export const HTMLContent = ({ content, className, style }) => {
  if (content && content.json) {
    return (
      <div className={className} style={style}>
        {documentToReactComponents(content.json)}
      </div>
    )
  }
  return (
    <div
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

const Content = ({ content, className, style }) => (
  <div className={className} style={style}>
    {content}
  </div>
)

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
}

HTMLContent.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.shape({
      json: PropTypes.object,
    }),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Content
