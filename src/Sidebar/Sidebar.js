import React from 'react'
import { Link } from "react-router-dom";
import './Sidebar.css'


export default function Sidebar() {
  return (
    <nav>
      <Link to="/">Enter an expense</Link>
      <Link to="/budget">This month's budget</Link>
      <Link to="/manage-categories">Manage budget categories</Link>
      <Link to='/'><button>Log in</button></Link>
      <Link to='/'><button>Register</button></Link>
    </nav>
  )
}
