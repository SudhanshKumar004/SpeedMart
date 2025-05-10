import React, { useContext, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaHome, FaListAlt, FaUser, FaSignInAlt } from 'react-icons/fa';
import { RiAdminFill } from "react-icons/ri";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import API_URL from './config/BaseURL';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import './css/model.css'
import { useSelector } from 'react-redux';
import { MyContext } from './LoginContext';




const Layout = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [adminid, setAdminid]= useState("");
  const [password, setPassword]= useState("");

  const {userName, userEmail, setLogedIn, logedIn} = useContext(MyContext)

  const nav = useNavigate();
  const Products = useSelector(state => state.myCart.cartItems);
  const prolength = Products.length;

  const handleSubmit=async(e)=>{
     e.preventDefault();
     
     try {
        let api=`${API_URL}/admin/adminlogin`;
        const response= await axios.post(api, {adminid:adminid, password:password});
        console.log(response);
        alert(response.data.msg);
        setShow(false);
        localStorage.setItem("admin", response.data.Admin.name);
        nav("/admindashboard");
     } catch (error) {
        console.log(error.response.data.msg);
     }
    }

    
      const logout = () =>{
        localStorage.clear();
        setLogedIn(false);
        alert("Logout Successfull");
      }

  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Admin Login</Modal.Title>
          <Modal.Title>Authorized Access Only⚠️</Modal.Title>
          
        </Modal.Header>
        <Modal.Body>

        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Id</Form.Label>
        <Form.Control type="text" placeholder="Enter Admin ID"
        value={adminid} onChange={(e)=>{setAdminid(e.target.value)}} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Enter Password</Form.Label>
        <Form.Control type="password" placeholder="Password"
        value={password} onChange={(e)=>{setPassword(e.target.value)}} />
      </Form.Group>
      <Button variant="info" type="submit" onClick={handleSubmit}>
       Login
      </Button>
    </Form>

        </Modal.Body>
      </Modal>
    <div className="top-navbar">
        <h4 className="navbar-quote">Your Perfect Pair Awaits - Browse Our Collection Now!</h4>
        <div className='nav-icons'>
          {logedIn ? <span>Welcome, {userName}</span> : ""}
          
          <span><button onClick={logout}>Logout</button></span>
       <span><PiShoppingCartSimpleBold onClick={()=>{nav("/cart")}} />{prolength}</span> 
        <span><RiAdminFill className="admin-icon" size={30} onClick={handleShow} /></span>
        </div>
      </div>
      
      <Navbar expand="lg" className="main-navbar">
        <Container>
          <Navbar.Brand>
            <span className="brand-name">ShoeVerse</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                <FaHome size={20} className="nav-icon" /> Home
              </Nav.Link>
              <Nav.Link as={Link} to="/categories">
                <FaListAlt size={20} className="nav-icon" /> Categories
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                <FaUser size={20} className="nav-icon" /> Login
              </Nav.Link>
              <Nav.Link as={Link} to="/registration">
                <FaSignInAlt size={20} className="nav-icon" /> Registration
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    
    
    <Outlet />

    <hr />

    <footer className="footer">
  <div className="footer-content">
    <p>&copy; 2025 Shoe-Verse. All Rights Reserved.</p>
    <nav className="footer-links">
      <a href="#">About Us</a>
      <a href="#">Contact</a>
      <a href="#">Privacy Policy</a>
      <a href="#">Terms & Conditions</a>
    </nav>
  </div>
  <div className="footer-extra">
    <p>Follow Us</p>
    <div className="social-links">
      <FaFacebook size={24} />
      <FaTwitter size={24} />
      <FaInstagram size={24} />
    </div>
  </div>
  <div className="footer-quick-links">
    <p>Quick Links</p>
    <nav className="footer-quick-nav">
      <p>Shop</p>
      <p>Sale</p>
      <p>New Arrivals</p>
      <p>FAQ</p>
    </nav>
  </div>
</footer>

    </>
  )
}

export default Layout
