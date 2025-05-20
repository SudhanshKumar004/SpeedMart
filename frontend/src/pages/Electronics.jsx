import React from 'react'
import { useParams } from 'react-router-dom'
import API_URL from '../config/BaseURL'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { addItem } from '../CartSlice'
import { useDispatch } from 'react-redux'
const Electronics = () => {
  const {id} = useParams()
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch(); 
  
    const loadProduct = async () =>{
      let api = `${API_URL}/admin/categoryproduct`
      try {
        const response = await axios.post(api, {id:id}); 
        console.log(response.data)
          setProduct(response.data)
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
        <Button variant="primary" onClick={()=>{dispatch(addItem({id:key._id, name:key.name, description:key.description , Brand:key.Brand, Category:key.Category, price:key.price, defaultImage:key.defaultImage, images:key.images, qnty:1}))}}>Add to Cart</Button>
      </Card.Body>
    </Card>
        </>
      )
    })
  return (
    <>
      <h1>Electronics</h1>
      <h2>{id}</h2>
      {productShow}
    </>
  )
}

export default Electronics
