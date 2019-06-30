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
      <div>
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
      <div>
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
      <nav>
        {TokenService.hasAuthToken()
          ? this.signedIn()
          : this.signedOut()}
      </nav>
    )
  }

}
