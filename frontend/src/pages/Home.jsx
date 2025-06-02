import React, { useContext, useEffect, useState } from 'react';
import '../css/Home.css';
import logo from '../media/logo.png';
import video from '../media/853958-hd_1920_1080_30fps.mp4';
import axios from 'axios';
import API_URL from '../config/BaseURL';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../css/card.css';
import { useDispatch } from 'react-redux';
import { addItem } from '../CartSlice';
import { MyContext } from '../LoginContext';
import { useNavigate } from 'react-router-dom';
import secondImage from '../media/heroimage.png'
import ContactUs from '../components/ContactUs';
 

const Home = () => {
  

  const [mydata, setmydata] = useState([]);
  const dispatch = useDispatch();
  const {logedIn, setLogedIn, setUserName, setUserEmail} = useContext(MyContext)
  const nav = useNavigate()
  
  
  const customerAuthenticate = async () => {
    const token = localStorage.getItem("token");

    console.log(token);
    if(token){
    let api = `${API_URL}/customer/authenticate`;
    const response = await axios.get(api ,{headers : {Authorization: `Bearer ${token}`}});
    console.log(response.data);
    localStorage.setItem("cusname", response.data.name);
    localStorage.setItem("cusemail", response.data.email);
    localStorage.setItem("cusid", response.data._id);
    localStorage.setItem("userLogedIn", true);
    setLogedIn(true);
    setUserName(localStorage.getItem("cusname"));
    setUserEmail(localStorage.getItem("cusemail"));
  }   
  }

  const loadData = async () =>{
    let api = `${API_URL}/admin/showproduct`;
    try {
    
      const response = await axios.get(api);
        setmydata(response.data);  
        console.log(response.data);
        
    } 
    
    catch (error) {
      console.log(error);
          
    }
  }

    useEffect(()=>{
      loadData();
      customerAuthenticate();
    },[])

    useEffect(()=>{
      customerAuthenticate();
    },[logedIn])
  
    const productShow = mydata.map((key)=>{
      let discount = key.price - (key.price * 10 / 100);
      return(
        <>  
        <Card className='product-cards'>
      <Card.Img variant="top" src={`${API_URL}/${key.defaultImage}`} height="300" />
      <Card.Body>
        <Card.Title>{key.name}</Card.Title>
        <Card.Text>
           <h4>{key.description}</h4>
           <h2> Price : ₹{discount}/- <h4><s><i>₹{key.price}</i></s></h4></h2> 
        </Card.Text>
        <Button variant="primary" onClick={()=>{dispatch(addItem({id:key._id, name:key.name, description:key.description , Brand:key.Brand, Category:key.Category, price:key.price, defaultImage:key.defaultImage, images:key.images, qnty:1}))}}>Add to Cart</Button>
      </Card.Body>
    </Card>
        </>
      )
    })
  return (
    <>
    <div className="home-container">
    <header className="hero-modern">
      <div className="hero-content">
        <h1><span className='main-title'>SpeedMart</span></h1>
        <h2>Delivers at Your Door in <strong>15 Minutes</strong></h2>
        <p>Fast, fresh and affordable – everything you need, delivered lightning fast!</p>

<div className="product-slider">
  <div className="product-track">
    <div className="product-card">
      <img src="https://www.factsmostly.com/wp-content/uploads/2024/09/Fruits.webp" alt="Fresh Fruits" />
    </div>
    <div className="product-card">
      <img src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Rockerz_551_ANC_Pro.347_1.jpg?v=1737546044" alt="Headphones" />
    </div>
    <div className="product-card">
      <img src="https://plus.unsplash.com/premium_photo-1677526496597-aa0f49053ce2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFrZXVwJTIwa2l0fGVufDB8fDB8fHww" alt="Makeup kit" />
    </div>
    <div className="product-card">
      <img src="https://5.imimg.com/data5/SELLER/Default/2023/3/296872949/ZZ/GG/BW/77999044/cold-drink-recipe-formulation.jpeg" alt="Drinks" />
    </div>
    <div className="product-card">
      <img src="https://www.lays.com/sites/lays.com/files/2020-11/lays-bbq.jpg" alt="Chips" />
    </div>
    <div className="product-card">
      <img src="https://i0.wp.com/www.kabilaifarm.com/wp-content/uploads/2023/06/Understanding-the-Different-Types-of-Dairy-Products.jpg?fit=1024%2C647&ssl=1" alt="Dairy" />
    </div>
  </div>
  </div>

      </div>
    </header>
    
    {/* secondary page */}
    <div className='secondary-page'>
      
    </div>
      <h1 className='delivery-head'>📦Free Delivery on orders above ₹499💸</h1>
      <h3 className='delivery-sub'>🏷️10% off on all products🔥</h3>
    <div className="cards">
      {productShow}
    </div>
    </div>
    <ContactUs />
    </>
  );
};

export default Home;
