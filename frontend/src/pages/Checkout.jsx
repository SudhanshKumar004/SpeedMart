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
  const [couponStatus, setCouponStatus] = useState(false);
  let totalAmnt = 0;
  let gst = 0;
  let shippingCharge = 50;
  const Products = useSelector(state => state.myCart.cartItems)

  const productPrint = Products.map((key) => {
    totalAmnt += key.price * key.qnty;
    gst = totalAmnt * 0.12;

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
    // if(!logedIn){
    //   alert("Please Login First");
    //   nav("/login");
    // }
    loadData();
  }, [])



  return (
    <>
 <StepProgressBar currentStep={1} /> 
    <div className="head">
      <div></div>
     <h1>Checkout Page</h1>
     <button onClick={()=>{nav("/cart")}}><IoMdArrowRoundBack /></button>
    </div>

<div className="checkout-container">
    <div className="cus-info">  
                  <Form className='checkout-form'>
                    <h2 className='form-head'>Customer Info</h2>
                    <Form.Group className="form-group " controlId="formBasicName">
                      <Form.Label className='form-label'>Name</Form.Label>
                        <Form.Control type="text" name='name' value={customerData.name || ''} onChange={handleInput} />
                    </Form.Group>

                    <Form.Group className="form-group" controlId="formBasicEmail">
                        <Form.Label className='form-label'>Email</Form.Label>
                        <Form.Control type="email" name='email' value={customerData.email || ''} onChange={handleInput}  />
                    </Form.Group>

                    <Form.Group className="form-group" controlId="formBasicNumber">
                        <Form.Label className='form-label'>Contact</Form.Label>
                        <Form.Control type="text" name='number' value={customerData.number || ''} onChange={handleInput} />
                    </Form.Group>

                    <h2 className='form-head'>Shipping Address</h2>
                    <Form.Group className="form-group" controlId="formBasicAddress">
                        <Form.Label className='form-label'>Address</Form.Label>
                        <Form.Control type="text" name='address' value={customerData.address || ''} onChange={handleInput}  />
                    </Form.Group>

                    <Form.Group className="form-group" controlId="formBasicPassword">
                        <Form.Label className='form-label'>City</Form.Label>
                        <Form.Control type="text" name='city' value={customerData.city || ''} onChange={handleInput} />
                    </Form.Group>

                    <Form.Group className="form-group" controlId="formBasicState">
                        <Form.Label className='form-label'>State</Form.Label>
                        <Form.Control type="text" name='state' value={customerData.state || ''} onChange={handleInput}/>
                    </Form.Group>        
                </Form>
      </div>

      <div className="cart-item">
        <h2 className='item-head'>Your Cart</h2>
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

    <div className="coupon">
    <input type="text" placeholder='Discount Code' style={{border : couponStatus ? "2px solid red" : "2px solid black"}} />
    <button onBlur={()=>{setCouponStatus(false)}} onClick={()=>{setCouponStatus(true)}}>Apply</button>
    {couponStatus && (
      <p style={{color : "red"}}>Coupan is not valid</p>
    )}
      <h2 className='coupan-title'><span className='title-span'>Item Subtotal :</span><span className='amnt-span'>₹{totalAmnt}</span></h2>
      <h2 className='coupan-title'><span className='title-span'>GST :</span><span className='amnt-span'>₹{gst}</span></h2>
      <h2 className="coupan-title"><span className='title-span'>Shipping Charge :</span><span className='amnt-span'>₹{shippingCharge}</span></h2>
      <hr />
      <h2 className='coupan-title'><span className='title2-span'>Total Amount :</span><span className='total-span'>₹{totalAmnt + gst + shippingCharge}</span></h2>
    </div>
      <button className='pay-btn' onClick={()=>{nav("/paymentpage")}}>Pay Now</button>
      </div>
      </div>
    </>
  )
}

export default Checkout
