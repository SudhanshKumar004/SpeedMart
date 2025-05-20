import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import API_URL from '../config/BaseURL';
import axios from 'axios';
import { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { addItem } from '../CartSlice'
import { useDispatch } from 'react-redux'



const Beauty = () => {
  const {id} = useParams();
  const [product, setProduct] = useState([]);
    const dispatch = useDispatch();
  
    const loadProduct = async () =>{
      let api = `${API_URL}/admin/categoryproduct`
      try {
        const response = await axios.post(api, {id:id}); 
          setProduct(response.data)
          console.log(response.data)
      } 
      
      catch (error) {
        console.log(error)
      }
    }
  
    useEffect(()=>{
      loadProduct();
    },[])
  
  
  
    const productShow = product.map((key)=>{
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
        <div className="d-flex justify-content-between">
          <Button
            variant="primary"
            onClick={() => {
              dispatch(
                addItem({
                  id: key._id,
                  name: key.name,
                  description: key.description,
                  Brand: key.Brand,
                  Category: key.Category,
                  price: key.price,
                  defaultImage: key.defaultImage,
                  images: key.images,
                  qnty: 1,
                })
              );
            }}
          >
            Add to Cart
          </Button>
          <Button variant="info">Details</Button>
        </div>
      </Card.Body>
    </Card>
        </>
      )
    })
  return (
    <>
      <h1>Beauty</h1>
      <h2>{id}</h2>
      {productShow}
    </>
  )
}

export default Beauty
