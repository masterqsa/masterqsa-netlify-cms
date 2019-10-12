import React from 'react'

export function PageHeader(props) {
  return (
    <h1 {...props} className={[`qsaHeader--page`, `is-size-1`, `has-text-weight-semibold`, props.className || ''].join(' ')} />
  );
}

export function SectionHeader({
  intro,
  children,
  ...rest
}) {
  return (
    <h2 {...rest} className={[`qsaHeader--section`, `is-size-2`, `has-text-weight-semibold`, rest.className || ''].join(' ')}>
      {intro && (<span className="qsaHeader__intro is-size-5 is-block">{intro}</span>)}
      {children}
    </h2>
  );
}

export function OrganismHeader(props) {
  return (
    <h4 {...props} className={[`qsaHeader--organism`, `is-size-4`, `has-text-weight-semibold`, props.className || ''].join(' ')} />
  );
}
