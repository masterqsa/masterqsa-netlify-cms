import React from 'react'

export default function Text(props) {
  return (
    <div {...props} className={["qsaText", "is-size-6", props.className || ''].join(' ')} />
  )
}
