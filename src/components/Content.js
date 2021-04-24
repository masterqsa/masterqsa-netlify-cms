import React from 'react'
import PropTypes from 'prop-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const ContentfulRawContent = ({ content }) => {
  const parsed = React.useMemo(() => {
    return documentToReactComponents(JSON.parse(content.raw))
  }, [content.raw])

  return <React.Fragment>{parsed}</React.Fragment>
}

export const HTMLContent = ({ content, className, style }) => {
  if (content && content.raw) {
    return (
      <div className={className} style={style}>
        <ContentfulRawContent content={content} />
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
      raw: PropTypes.object,
    }),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Content
