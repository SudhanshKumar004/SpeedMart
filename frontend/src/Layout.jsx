import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaHome, FaListAlt, FaUser, FaSignInAlt } from 'react-icons/fa';


const Layout = () => {
  return (
    <>
    <div className="top-navbar">
    
  </div>
  <Navbar expand="lg" className="main-navbar">
        <Container>
          <Navbar.Brand href="#home">ShoeVerse</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="home">
                <FaHome size={20} style={{ marginRight: '8px' }} />
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="categories">
                <FaListAlt size={20} style={{ marginRight: '8px' }} />
                Categories
              </Nav.Link>
              <Nav.Link as={Link} to="login">
                <FaUser size={20} style={{ marginRight: '8px' }} />
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="registration">
                <FaSignInAlt size={20} style={{ marginRight: '8px' }} />
                Registration
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="top-navbar">
    
  </div>
    
    
    <Outlet />

    <hr />

    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 E-commerce. All Rights Reserved.</p>
        <nav className="footer-links">
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </nav>
      </div>
    </footer>
    </>
  )
}

export default Layout
