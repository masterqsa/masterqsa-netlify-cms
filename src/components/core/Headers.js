import React from 'react'

export function PageHeader({ children, className, ...rest }) {
  return (
    <h1
      {...rest}
      className={[
        `qsaHeader--page`,
        `is-size-1`,
        `has-text-weight-semibold`,
        className || '',
      ].join(' ')}
    >
      {children}
    </h1>
  )
}

export function SectionHeader({ intro, children, className, ...rest }) {
  return (
    <h2
      {...rest}
      className={[
        `qsaHeader--section`,
        `is-size-2`,
        `has-text-weight-semibold`,
        className || '',
      ].join(' ')}
    >
      {intro && (
        <span className="qsaHeader__intro is-size-5 is-block">{intro}</span>
      )}
      {children}
    </h2>
  )
}

export function OrganismHeader({ children, className, ...rest }) {
  return (
    <h4
      {...rest}
      className={[
        `qsaHeader--organism`,
        `is-size-4`,
        `has-text-weight-semibold`,
        className || '',
      ].join(' ')}
    >
      {children}
    </h4>
  )
}
