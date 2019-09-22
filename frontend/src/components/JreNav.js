import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../imgs/jre.png'
import './JreNav.css'

class JreNav extends React.Component {

  render() {
    return (
      <Navbar bg="light" >
        <Navbar.Brand>
          <Link to="/" className="nostyle">
            <img
              alt=""
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top logo"
            />
            <span className="h1">JRE</span>
          </Link>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link><Link to="/" className="nostyle">Search</Link></Nav.Link>
          <Nav.Link><Link to="/analytics/" className="nostyle">Analytics</Link></Nav.Link>
          <Nav.Link><Link to="/about/" className="nostyle">About</Link></Nav.Link>      
        </Nav>
      </Navbar>
    );
  }
}

export default JreNav;
