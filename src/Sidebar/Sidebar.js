import React from 'react'
import { Link } from "react-router-dom";


export default function Sidebar() {
  return (
    <nav>
      <Link to="/">Enter an expense</Link>
      <Link to="/budget">This month's budget</Link>
      <Link to="/manage-categories">Manage budget categories</Link>
    </nav>
  )
}
