import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import logo from '../media/logo.png';
import video from '../media/853958-hd_1920_1080_30fps.mp4';
import axios from 'axios';
import API_URL from '../config/BaseURL';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../css/card.css';

const Home = () => {

  const [mydata, setmydata] = useState([]);

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
    },[])
  
    const productShow = mydata.map((key)=>{
      return(
        <>  
        <Card className='product-card'>
      <Card.Img variant="top" src={`${API_URL}/${key.defaultImage}`} height="300" />
      <Card.Body>
        <Card.Title>{key.name}</Card.Title>
        <Card.Text>
           <h4>{key.description}</h4>
           <h4>Brand : {key.brand}</h4>
           <h4>{key.category}</h4>
           <h2> Price : {key.price}</h2>
        </Card.Text>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
        </>
      )
    })
  return (
    <>
    <div className="vcontainer">
      <video autoPlay loop muted playsInline className="backgroundVideo" src={video} />
      <div className="heroTitle">
        <img src={logo} alt="" height={100} width={180} />
        <h1>SHOE-VERSE</h1>
        <p>Where Every Step Matters.</p>
      </div>
    </div>
    <div className="cards">
      {productShow}
    </div>
    </>
  );
};

export default Home;
