import React, { Component } from 'react'
import { Link } from "react-router-dom";
import TokenService from '../Auth/TokenService'
import './Nav.css'


export default class Nav extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
  }

  signedIn() {
    return (
      <div className="nav-links">
        <Link to="/">Enter an expense</Link>
        <Link to="/manage-categories">Manage budget categories</Link>
        <Link
          onClick={this.handleLogoutClick}
          to='/login'>
          Logout
        </Link>
      </div>
    )
  }

  signedOut() {
    return (
      <div className="nav-links">
        <Link
          to='/register'>
          Register
        </Link>
        <Link
          to='/login'>
          Log in
        </Link>
      </div>
    )
  }


  render() {
    return (
      <nav className="nav-links">

        <h1>Change Jar</h1>

        {TokenService.hasAuthToken()
          ? this.signedIn()
          : this.signedOut()}
      </nav>
    )
  }

}
