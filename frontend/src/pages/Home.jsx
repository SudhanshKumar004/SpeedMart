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
           <h4>Brand : {key.Brand}</h4>
           <h4>{key.Category}</h4>
           <h2> Price : {key.price}</h2>
        </Card.Text>
        <Button variant="primary" onClick={()=>{dispatch(addItem({id:key._id, name:key.name, description:key.description , Brand:key.Brand, Category:key.Category, price:key.price, defaultImage:key.defaultImage, images:key.images, qnty:1}))}}>Add to Cart</Button>
      </Card.Body>
    </Card>
        </>
      )
    })
  return (
    <>
    {/* <div className="vcontainer">
      <video autoPlay loop muted playsInline className="backgroundVideo" src={video} />
      <div className="heroTitle">
        <img src={logo} alt="" height={100} width={180} />
        <h1>SHOE-VERSE</h1>
        <p>Where Every Step Matters.</p>
      </div>
    </div> */}
    <header className="hero-modern">
      <div className="hero-content">
        <h1><span>SpeedMart</span></h1>
        <h2>Groceries at Your Door in <strong>15 Minutes</strong></h2>
        <p>Fast, fresh and affordable – everything you need, delivered lightning fast!</p>
        <button className="cta" onClick={()=>{nav("/")}}>Start Shopping</button>

        <div className="product-row">
          <div className="product-card">
            <img src="/product1.jpg" alt="Fresh Fruits" />
            <h3>Fresh Fruits</h3>
            <p>₹99/kg</p>
          </div>
          <div className="product-card">
            <img src="/product2.jpg" alt="Milk" />
            <h3>Dairy Milk</h3>
            <p>₹55</p>
          </div>
          <div className="product-card">
            <img src="/product3.jpg" alt="Snacks" />
            <h3>Quick Snacks</h3>
            <p>₹149</p>
          </div>
        </div>
      </div>
    </header>
    <div className="cards">
      {productShow}
    </div>
    </>
  );
};

export default Home;
