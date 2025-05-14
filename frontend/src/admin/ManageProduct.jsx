import React, { useEffect, useState } from 'react'
import axios from 'axios'
import API_URL from "../config/BaseURL"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../css/manageproduct.css'
import { useNavigate } from 'react-router-dom';


const ManageProduct = () => {

  const [product, setProduct] = useState([])
  const nav = useNavigate(); 

  const loadData = async () =>{
    let api = `${API_URL}/admin/showproduct`;
    try {
      const response = await axios.get(api);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  }


  const editproduct = (id) => {
    nav(`/admindashboard/editproduct/${id}`);
  }

  useEffect(()=>{
    loadData();
  },[])

   const productShow = product.map((key)=>{
        return(
          <>  
          <Card className='manage-card'>
        <Card.Img variant="top" src={`${API_URL}/${key.defaultImage}`} />
        <Card.Body>
          <Card.Title>{key.name}</Card.Title>
          <Card.Text>
             <h4>{key.description}</h4>
             <h4>Brand : {key.Brand}</h4>
             <h4>{key.Category}</h4>
             <h2> Price : {key.price}</h2>
          </Card.Text>
          <Button variant="primary" onClick={()=>{editproduct(key._id)}}>Edit Product  </Button>
        </Card.Body>
      </Card>
          </>
        )
      })


  return (
    <>
      <h1>Manage</h1>
      <div className="manage-card-container">
      {productShow}
      </div>
    </>
  )
}

export default ManageProduct
