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
      return(
        <>  
        <Card className='product-card'>
      <Card.Img variant="top" src={`${API_URL}/${key.defaultImage}`} height="300" />
      <Card.Body>
        <Card.Title>{key.name}</Card.Title>
        <Card.Text>
           <h4>{key.description}</h4>
           <h2> Price : {key.price}</h2>
        </Card.Text>
        <div className="buttons">
        <Button variant="primary" onClick={()=>{dispatch(addItem({id:key._id, name:key.name, description:key.description , Brand:key.Brand, Category:key.Category, price:key.price, defaultImage:key.defaultImage, images:key.images, qnty:1}))}}>Add to Cart</Button>
        <button>Product Details </button>
        </div>
      </Card.Body>
    </Card>
        </>
      )
    })
  return (
    <>
    <header className="hero-modern">
      <div className="hero-content">
        <h1><span className='main-title'>SpeedMart</span></h1>
        <h2>Delivers at Your Door in <strong>15 Minutes</strong></h2>
        <p>Fast, fresh and affordable – everything you need, delivered lightning fast!</p>

  <div className="product-track">
    <div className="product-card">
      <img src="https://www.factsmostly.com/wp-content/uploads/2024/09/Fruits.webp" alt="Fresh Fruits" />
    </div>
    <div className="product-card">
      <img src="https://cdn.shopify.com/s/files/1/0657/3100/2634/files/papier-peint-casque-audio-casque-stylise-avec-eclaboussures-de-peinture-vibrantes_1318c681-3a8c-4270-9c48-3ab42ba5ee65.png?v=1734363202" alt="Headphones" />
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
    </header>
    
    {/* secondary page */}
    <div className='secondary-page'>
      
    </div>
    <div className="cards">
      {productShow}
    </div>
    <hr />
    </>
  );
};

export default Home;
