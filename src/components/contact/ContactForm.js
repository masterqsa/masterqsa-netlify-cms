import React from 'react'
import PropTypes from 'prop-types'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isValidated: false, submitted: false }
    this.formRef = React.createRef()
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => this.setState({ submitted: true }))
      .catch(error => alert(error))
  }

  render() {
    const { className } = this.props

    const baseClassName = `quickForm${className ? ` ${className}` : ``}`

    if (this.state.submitted) {
      return (
        <div className={`${baseClassName} quickForm--submitted`} style={{ height: this.formRef.current ? this.formRef.current.clientHeight : undefined }}>
          <p className="has-text-centered">
            <span className="icon is-large has-text-brand">
              <i className="fas fa-check-circle fa-3x" />
            </span>
          </p>
          <br/>
          <p className="has-text-centered is-size-4">
            Thank you! We'll get in touch with you soon!
          </p>
        </div>
      )
    }
    
    return (
      <form
        name="contact"
        method="post"
        action="/contact/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={this.handleSubmit}
        className={baseClassName}
        ref={this.formRef}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="contact" />
        <div hidden>
          <label>
            Don’t fill this out:{' '}
            <input name="bot-field" onChange={this.handleChange} />
          </label>
        </div>
        <div
          role="group"
          aria-labelledby="quickForm__label--client"
          className="field"
        >
        <span id="quickForm__label--client" className="label">
          How can we contact you?
        </span>
        <div className="field">
            <input
              className="input"
              type={'text'}
              name={'name'}
              onChange={this.handleChange}
              id={'name'}
              required={true}
              placeholder="Your name"
              aria-label="Your name"
              className="field"
            />
            <input
              className="input"
              type={'email'}
              name={'email'}
              onChange={this.handleChange}
              id={'email'}
              required={true}
              placeholder="Your email"
              aria-label="Your email"
              className="field"
            />
        </div>
        </div>
        <div className="field">
          <label className="label" htmlFor={'companyName'}>
            Your company name
          </label>
          <div className="control">
            <input
              className="input"
              type={'text'}
              name={'companyName'}
              onChange={this.handleChange}
              id={'companyName'}
              placeholder="Enter your company name"
              required={true}
              className="field"
            />
          </div>
        </div>
        <br/>
        <div className="field">
          <button className="button is-primary" type="submit">
            Request Demo
          </button>
        </div>
      </form>
    )
  }
}

ContactForm.propTypes = {
  className: PropTypes.string,
}
