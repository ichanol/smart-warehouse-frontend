import React from 'react'
import './navbar.css'

function Navbar() {

  return (
    <div className='navbar'>
      <div className='logo'>
        <a><label>Smart Warehouse</label></a>
      </div>
      <ul>
        <a href='#'><li>Import - Export</li></a>
        <a href='#'><li>IPS Tracking</li></a>
        <a href='#'><li>History</li></a>
        <a href='#'><li>Inventory</li></a>
      </ul>
    </div>
  )
}

export default Navbar