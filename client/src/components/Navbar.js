import React from 'react'
import {NavLink} from "react-router-dom";
import logo from '../components/images/eee.jpeg';
//import 'bootstrap/dist/css/bootstrap.css';
const Navbar = () => {
  return (
   <>
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">
    <img src={logo} alt="eagle"></img>
    </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">About</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/contact">contact</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">registration</NavLink>
        </li>
       
      </ul>
    </div>
  </div>
</nav>
   </>
  )
}

export default Navbar