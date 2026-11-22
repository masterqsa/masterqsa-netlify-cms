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
    this.state = {
      name: '',
      email: '',
      companyName: '',
      inquiryNotes: '',
      'bot-field': '',
      submitted: false,
      submitting: false,
      errorMessage: '',
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, errorMessage: '' })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    this.setState({ submitting: true, errorMessage: '' })

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name') || 'contact',
        name: this.state.name,
        email: this.state.email,
        companyName: this.state.companyName,
        inquiryNotes: this.state.inquiryNotes,
        'bot-field': this.state['bot-field'],
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Submission could not be confirmed.')
        }
        this.setState({ submitted: true, submitting: false })
      })
      .catch(() => {
        this.setState({
          submitting: false,
          errorMessage:
            'We could not send your request right now. Please try again or email sales directly.',
        })
      })
  }

  render() {
    const { className } = this.props
    const cardClass = `tq-form-card${className ? ` ${className}` : ''}`

    if (this.state.submitted) {
      return (
        <div className={cardClass} role="status" aria-live="polite">
          <div className="tq-form-success">
            <div className="tq-form-success__icon" aria-hidden="true">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="tq-form-card__title" style={{ textAlign: 'center' }}>
              Request Received
            </h3>
            <p style={{ color: 'var(--tq-muted)', marginBottom: 0 }}>
              Thank you. Our team will reach out shortly with demo availability,
              Pay-as-you-go pricing details, or package options.
            </p>
          </div>
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
        className={cardClass}
      >
        <input type="hidden" name="form-name" value="contact" />
        <div hidden>
          <label>
            Don’t fill this out:{' '}
            <input
              name="bot-field"
              value={this.state['bot-field']}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <h3 className="tq-form-card__title">
          Request a Demo or Package Quote
        </h3>
        <p className="tq-form-card__sub">
          Tell us about your team and whether you want a live walkthrough,
          Pay-as-you-go rates, or custom package pricing.
        </p>

        {this.state.errorMessage && (
          <div className="tq-form-alert" role="alert">
            {this.state.errorMessage}
          </div>
        )}

        <div className="tq-form-field">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
            placeholder="Alex Morgan"
          />
        </div>

        <div className="tq-form-field">
          <label htmlFor="email">Work Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={this.state.email}
            onChange={this.handleChange}
            required
            placeholder="alex@qsa-firm.com"
          />
        </div>

        <div className="tq-form-field">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            name="companyName"
            id="companyName"
            value={this.state.companyName}
            onChange={this.handleChange}
            required
            placeholder="Enter your company name"
          />
        </div>

        <div className="tq-form-field">
          <label htmlFor="inquiryNotes">Focus Areas (Optional)</label>
          <textarea
            name="inquiryNotes"
            id="inquiryNotes"
            value={this.state.inquiryNotes}
            onChange={this.handleChange}
            placeholder="Live demo, Pay-as-you-go pricing, Standalone SAQs, package deals, or Turbo Assessment multi-standard suite..."
          />
        </div>

        <button
          className="tq-btn tq-btn--primary"
          style={{ width: '100%' }}
          type="submit"
          disabled={this.state.submitting}
        >
          {this.state.submitting ? 'Sending Request...' : 'Request Demo'}
        </button>
      </form>
    )
  }
}

ContactForm.propTypes = {
  className: PropTypes.string,
}
