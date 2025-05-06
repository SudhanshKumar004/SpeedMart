import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../LoginContext'
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import API_URL from '../config/BaseURL';
import { IoMdArrowRoundBack } from "react-icons/io";
import '../css/checkout.css';
import StepProgressBar from "../components/StepProgressBar";
import axios from 'axios';
import Form from 'react-bootstrap/Form';


const Checkout = () => {
  const {logedIn} = useContext(MyContext);
  const nav = useNavigate();
  const [customerData, setCustomerData] = useState({});

  const Products = useSelector(state => state.myCart.cartItems)

  const productPrint = Products.map((key) => {
    return (
      <tr>
        <td><img src={`${API_URL}/${key.defaultImage}`} alt="Item Image" width={80} height={80} /></td>
        <td>{key.name}</td>
        <td>{key.Brand}</td>
        <td>{key.Category}</td>
        <td>{key.price}</td>
        <td>{key.qnty}</td>
        <td>{key.qnty * key.price}</td>
      </tr>
    )
  })

  const loadData = async () =>{
    let api = `${API_URL}/customer/checkoutData`;
    try {
      let response = await axios.post(api, {cusid : localStorage.getItem("cusid")});
    // console.log(response.data);
    setCustomerData(response.data);

    } catch (error) {
      console.log(error);  
    } 
  }

  const handleInput = (e) =>{
    let name = e.target.name;
    let value = e.target.value;
    setCustomerData(values=>({...values, [name]:value}))

  }

  useEffect(() => {
    if(!logedIn){
      alert("Please Login First");
      nav("/login");
    }
    loadData();
  }, [])



  return (
    <>
 <StepProgressBar currentStep={1} /> 
    <div className="head">
      <div></div>
     <h1>Checkout Page</h1>
     <button onClick={()=>{nav("/cart")}}><IoMdArrowRoundBack />
</button>
    </div>

<div className="checkout-container">
    <div className="cus-info">  
                  <Form>
                    <h2>Customer Info</h2>
                    <Form.Group className="sm-1 " controlId="formBasicName">
                      <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name='name' value={customerData.name || ''} onChange={handleInput} />
                    </Form.Group>

                    <Form.Group className="sm-1" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name='email' value={customerData.email || ''} onChange={handleInput}  />
                    </Form.Group>

                    <Form.Group className="sm-1" controlId="formBasicNumber">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type="text" name='number' value={customerData.number || ''} onChange={handleInput} />
                    </Form.Group>

                    <h2>Shipping Address</h2>
                    <Form.Group className="sm-1" controlId="formBasicAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" name='address' value={customerData.address || ''} onChange={handleInput}  />
                    </Form.Group>

                    <Form.Group className="sm-1" controlId="formBasicPassword">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" name='city' value={customerData.city || ''} onChange={handleInput} />
                    </Form.Group>

                    <Form.Group className="sm-1" controlId="formBasicState">
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" name='state' value={customerData.state || ''} onChange={handleInput}/>
                    </Form.Group>        
                </Form>
      </div>

      <div className="cart-item">
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th>Brand</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {productPrint}
      </tbody>
    </Table>
      </div>
      </div>
    </>
  )
}

export default Checkout
