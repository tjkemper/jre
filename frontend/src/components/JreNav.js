import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import jreLogo from '../imgs/jre.png'

class JreNav extends React.Component {

  render() {
    return (
      <Navbar bg="light" >
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={jreLogo}
            width="50"
            height="50"
            className="d-inline-block align-top"
          />
          <span className="h1">JRE</span>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Search</Nav.Link>
          <Nav.Link href="#analytics">Analytics</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default JreNav;
