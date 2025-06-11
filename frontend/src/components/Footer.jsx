import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const Footer = () => {
  const nav = useNavigate();
  return (
    <>
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
        <p onClick={() => {nav("/faq"); window.scrollTo(0, 0)}}>FAQ</p>
      </nav>
    </div>
  </footer>
    </>
  )
}

export default Footer
