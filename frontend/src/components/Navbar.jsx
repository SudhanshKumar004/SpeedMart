    import React, { useContext, useState } from 'react'
    import { Link,useLocation,useNavigate } from 'react-router-dom'
    import Container from 'react-bootstrap/Container';
    import Nav from 'react-bootstrap/Nav';
    import Navbar from 'react-bootstrap/Navbar';
    import { IoHeadsetOutline } from "react-icons/io5";
    import { RiAdminFill } from "react-icons/ri";
    import { LiaCartPlusSolid } from "react-icons/lia";
    import Modal from 'react-bootstrap/Modal';
    import Button from 'react-bootstrap/Button';
    import API_URL from '../config/BaseURL';
    import axios from 'axios';
    import Form from 'react-bootstrap/Form';
    import '../css/model.css'
    import { useSelector } from 'react-redux';
    import { MyContext } from '../LoginContext';
    import { FaRegUserCircle } from "react-icons/fa";
    import Login from '../pages/Login';
    import { LiaAppleAltSolid } from "react-icons/lia";
    import { GiLipstick } from "react-icons/gi";
    import { RiDrinksLine } from "react-icons/ri";
    import { useEffect } from 'react';
    import { ShoppingCart } from 'lucide-react';
    import { PiShoppingCartLight } from "react-icons/pi";
    import { CiLogout } from "react-icons/ci";
    import { toast } from 'react-toastify';

const NavBar = () => {
    const [input, setInput] = useState({
        email: '',
        password: ''
      });
        const [show, setShow] = useState(false);
        const [show1, setShow1] = useState(false);
    
        const handleClose = () => setShow(false);
        const handleClose1 = () => setShow1(false);
        
        const handleShow = () => setShow(true);
        const handleShow1 = () => setShow1(true);
    
        const [adminid, setAdminid]= useState("");
        const [password, setPassword]= useState("");
    
        const {logedIn, setLogedIn, userName, setUserName, userEmail, setUserEmail, searchdata, setSearchdata, searchproduct, setSearchproduct} = useContext(MyContext);
    
        const [categories, setCategories] = useState([]);
        const [showLogoutMenu, setShowLogoutMenu] = useState(false);

        const nav = useNavigate();
        const Products = useSelector(state => state.myCart.cartItems);
        const prolength = Products.length;
        const location = useLocation();
    
    
        const fetchCategories = async () => {
          let api = `${API_URL}/admin/getcategories`;
          try {
            const response = await axios.get(api);
            setCategories(response.data);
          }  
          catch (error) {
            console.log(error);
          }
        }
    
        const iconMap = {
          fruitpage: <LiaAppleAltSolid size={20} className="nav-icon" />,
          beauty: <GiLipstick size={20} className="nav-icon" />,
          drinks: <RiDrinksLine size={20} className="nav-icon" />,
          electronics: <IoHeadsetOutline size={20} className="nav-icon" />,
        };
    
        const handleInput = (e) =>{
          let name = e.target.name;
          let value = e.target.value;
          setInput(values=>({...values,[name]:value}))        
      }
    
        const handleSubmit=async(e)=>{
          e.preventDefault();
          
          try {
              let api=`${API_URL}/admin/adminlogin`;
              const response= await axios.post(api, {adminid:adminid, password:password});
              console.log(response);
              toast.success(response.data.msg, {
                position: "top-center",
                autoClose: 2000,
                theme: "colored",
                closeOnClick: true,
                pauseOnHover: false
              });
              setShow(false);
              localStorage.setItem("admin", response.data.Admin.name);
              nav("/admindashboard");
          } catch (error) {
            toast.error(error.response.data.msg, {
              position: "top-center", 
              autoClose: 2000,
              theme: "colored",
              closeOnClick: true,
              pauseOnHover: false
            });
          }
          }
    
          const userhandleSubmit = async(e)=>{
            e.preventDefault();
            let api = `${API_URL}/customer/login`
            try {
                let response = await axios.post(api, input)
                toast.success("✅ Login Successful!", {
                  position: "top-center",
                  autoClose: 2000,
                  theme: "colored",
                  closeOnClick: true,
                  pauseOnHover: false
                });
    
            localStorage.setItem("token", response.data.token);
            setLogedIn(true); 
            setShow1(false);
            setInput (values => ({ ...values, email: '', password: '' }));
            } 
            
            catch (error) {
                toast.error(error.response.data.msg, {
                  position: "top-center",
                  autoClose: 2000,
                  theme: "colored",
                  closeOnClick: true,
                  pauseOnHover: false
  });
            }
        }
          
            const logout = () =>{
              localStorage.clear();
              setLogedIn(false);
              toast.info("👋 Logged out successfully", {
                position: "top-right",
                autoClose: 2000,
                theme: "colored",
                closeOnClick: true,
                pauseOnHover: false
              });
            }
    

            const handleSearchInput = (e) =>{
              let {name , value} = e.target;
              setSearchdata(values=>({...values, [name]:value}))
              console.log(searchdata);
              
            }
            const handleSearch = async () =>{
              let api = `${API_URL}/admin/searchproduct`

              try {
                let response = await axios.post(api, searchdata)
                console.log(response);
                setSearchproduct(response.data);
                nav("/searchresult");
                
              } catch (error) {
                console.log(error);
                nav("/searchresult");
                
              }
            }
            useEffect(() => {
              fetchCategories();
            }, []);
            
  return (
    <>
      {/* Admin Login Modal */}
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


      {/* User Login Modal */}
      <Login
      show1={show1} 
      handleClose1={handleClose1}
      input={input}
      handleInput={handleInput}
      userhandleSubmit={userhandleSubmit} 
      />

        {/* Top Navbar */}
      <div className="top-navbar">
          <h4 className="navbar-quote"><img src="https://www.freepnglogos.com/uploads/shopping-bag-png/shopping-bag-plaseto-bag-plaseto-bags-manufacturer-west-bengal-17.png" alt="" height={60} width={60} /></h4>
          <span className='search-area'>
          <input type="text" name="search" id="" placeholder='Search items' value={searchdata.search} onChange={handleSearchInput} />
          <button onClick={handleSearch}>Search</button>
          </span>
          
          <div className='nav-icons'>
            <span onClick={() => nav("/cart")} className='cart-area'><LiaCartPlusSolid /><span>{prolength}</span></span>

            <span><RiAdminFill className="admin-icon" size={30} onClick={handleShow} /></span>

            <span onClick={() => {
              if (logedIn) {
                setShowLogoutMenu(prev => !prev);
              } else {
                handleShow1();
              }
              }} className='login-area' ><FaRegUserCircle style={{ color: "palevioletred", marginTop: "5px" }} /><span>
      {logedIn ? (
        <span style={{ color: "teal", fontWeight: "bold", fontSize: "15px" }}>
          {userName}
        </span>
      ) : (
        "Login"
      )}
    </span>

    {logedIn && showLogoutMenu && (
      <div className="logout-menu">
        <button onClick={() => {logout();setShowLogoutMenu(false);}} className='logout-btn'>Logout <CiLogout size={20} /></button>
      </div>
    )}
  </span>
</div>

        </div>
        
        {/* Main Navbar */}
        <Navbar expand="lg" className="main-navbar">
      <Container>
        <Navbar.Brand>
          <span className="brand-name" onClick={() => nav("/home")}><span>Speed</span><span style={{color:"#09b1ec"}}>Mart</span></span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {categories.map(cat => (
              <Nav.Link as={Link} to={`/${cat.route}/${cat._id}`}>
                {iconMap[cat.route]} {cat.name}   {/*each icon will place with route location*/}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    {prolength > 0 && location.pathname !== '/cart' && location.pathname !== '/checkout' && location.pathname !== '/paymentpage' && location.pathname !== '/orderdetail' && (
  <div className="floating-cart" onClick={() => nav('/cart')}>
    <div className="cart-icon">
    <PiShoppingCartLight size={30} />
      <span className="item-count">{prolength}</span>
    </div>
  </div>
)}


    </>
  )
}

export default NavBar
