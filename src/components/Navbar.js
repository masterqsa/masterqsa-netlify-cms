import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.svg'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item logo" title="MasterQSA">
              <img src={logo} alt="MasterQSA Logo" />
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start has-text-centered">
              <Link activeClassName="is-active" className="navbar-item" to="/pilot">
                Pilot
              </Link>
              {/* <Link activeClassName="is-active" className="navbar-item" to="/pricing">
                Pricing
              </Link> */}
              <Link activeClassName="is-active" className="navbar-item" to="/about">
                About Us
              </Link>
              <Link activeClassName="is-active" className="navbar-item" to="/blog">
                Blog
              </Link>
              <Link activeClassName="is-active" className="navbar-item" to="/contact">
                Contact
              </Link>
            </div>
            <div className="navbar-end has-text-centered">
              <div className="navbar-item">
                <Link className="btn" to="/contact">
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
