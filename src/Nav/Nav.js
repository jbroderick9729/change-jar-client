import React from 'react'
import { Link } from "react-router-dom";
import './Nav.css'


export default function Sidebar() {
  return (
    <nav>
      <Link to="/">Enter an expense</Link>
      <Link to="/manage-categories">Manage budget categories</Link>
      <Link to='/'><button className='button'>Log in</button></Link>
      <Link to='/'><button className='button'>Register</button></Link>
    </nav>
  )
}
