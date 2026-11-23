import React from 'react'
import PropTypes from 'prop-types'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class PilotForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      phone: '',
      email: '',
      companyName: '',
      staffQSA: '',
      numQSA: '',
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
        'form-name': form.getAttribute('name') || 'pilot',
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        companyName: this.state.companyName,
        staffQSA: this.state.staffQSA,
        numQSA: this.state.numQSA,
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
            'We could not submit your pilot request right now. Please try again.',
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
              Pilot Request Received
            </h3>
            <p style={{ color: 'var(--tq-muted)', marginBottom: 0 }}>
              Thank you! We will get in touch with your team soon.
            </p>
          </div>
        </div>
      )
    }

    return (
      <form
        name="pilot"
        method="post"
        action="/contact/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={this.handleSubmit}
        className={cardClass}
      >
        <input type="hidden" name="form-name" value="pilot" />
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

        <h3 className="tq-form-card__title">How can we contact you?</h3>
        <p className="tq-form-card__sub">
          Share your practice details to start an evaluation workspace.
        </p>

        {this.state.errorMessage && (
          <div className="tq-form-alert" role="alert">
            {this.state.errorMessage}
          </div>
        )}

        <div className="tq-form-field">
          <label htmlFor="pilot-name">Your Name</label>
          <input
            type="text"
            name="name"
            id="pilot-name"
            value={this.state.name}
            onChange={this.handleChange}
            required
            placeholder="Your name"
          />
        </div>

        <div className="tq-form-field">
          <label htmlFor="pilot-phone">Your Phone</label>
          <input
            type="tel"
            name="phone"
            id="pilot-phone"
            value={this.state.phone}
            onChange={this.handleChange}
            required
            placeholder="Your phone"
          />
        </div>

        <div className="tq-form-field">
          <label htmlFor="pilot-email">Your Email</label>
          <input
            type="email"
            name="email"
            id="pilot-email"
            value={this.state.email}
            onChange={this.handleChange}
            required
            placeholder="Your email"
          />
        </div>

        <div className="tq-form-field">
          <label htmlFor="pilot-company">Company Name</label>
          <input
            type="text"
            name="companyName"
            id="pilot-company"
            value={this.state.companyName}
            onChange={this.handleChange}
            required
            placeholder="Enter your company name"
          />
        </div>

        <div className="tq-form-field">
          <label htmlFor="pilot-staff">Number of QSAs on Your Staff</label>
          <input
            type="text"
            name="staffQSA"
            id="pilot-staff"
            value={this.state.staffQSA}
            onChange={this.handleChange}
            required
            placeholder="Number of QSAs on your staff"
          />
        </div>

        <div className="tq-form-field">
          <label htmlFor="pilot-num">
            Approximate Annual ROC &amp; Standalone SAQ Volume
          </label>
          <input
            type="text"
            name="numQSA"
            id="pilot-num"
            value={this.state.numQSA}
            onChange={this.handleChange}
            required
            placeholder="Approximate number of ROC and SAQ reports per year"
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

PilotForm.propTypes = {
  className: PropTypes.string,
}
