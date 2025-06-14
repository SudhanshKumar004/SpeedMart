import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "../css/orderdetail.css";
import API_URL from "../config/BaseURL";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { cartClear } from "../CartSlice";
import { useDispatch } from "react-redux";

const OrderDetail = () => {
    const [orderdetail, setOrderdetail] = useState({});
    const [customerdetail, setCustomerdetail] = useState({});
    const [show, setShow] = useState(false);
    const nav = useNavigate();
    const dispatch = useDispatch();

    const loadData = async () => {
        let api = `${API_URL}/customer/orderdetail`;
        let api1 = `${API_URL}/customer/customerdetails`; 
        try {
            let response =  await axios.post(api, {cusid : localStorage.getItem("cusid")});
            let response1 =  await axios.post(api1, {cusid : localStorage.getItem("cusid")});
            console.log(response.data);
            console.log(response1.data);
            setOrderdetail(response.data);
            setCustomerdetail(response1.data);
            dispatch(cartClear());
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadData();
        const timer = setTimeout(() => {
          setShow(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    if(!show) return null;
  return (
    <>
    {show && (
  <div className="order-success">
    <div className="fireworks">
      <div className="explosion pastel1"></div>
      <div className="explosion pastel2"></div>
      <div className="explosion pastel3"></div>
    </div>
    <h1>Order Placed Successfully</h1>
  </div>
)}

    <div className="order-container">
      <h1 className="page-title">Order Details</h1>
      <div className="order-detail-container">

        {/* Left side: Order info + product table */}
        <div className="order-info-section">
          <div className="order-header">
          <h2>Order #{orderdetail.ordernumber}</h2>
          <Button variant="primary" className="track-button" onClick={() => nav("/trackorder")}>Track Order</Button>
          </div>
          <p><strong>Order Date:</strong> {new Date(orderdetail.orderAt).toLocaleDateString()}</p>
          <p><strong>Status:</strong> <span className="status shipped">Order Placed</span></p>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Products</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>

              <tr>
                <td>{orderdetail.productname}</td>
                <td>{orderdetail.qnty}</td>
                <td>₹{orderdetail.productprice}</td>
              </tr>
            
              <tr>
                <td colSpan={2} style={{ textAlign: "right", fontWeight: "bold" }}>Subtotal</td>
                <td>₹{orderdetail.totalamount}</td>
              </tr>
              <tr>
                <td colSpan={2} style={{ textAlign: "right" }}>GST (12%)</td>
                <td>{orderdetail.gst}</td>
              </tr>
              <tr>
                <td colSpan={2} style={{ textAlign: "right" }}>Shipping Charge</td>
                <td>{orderdetail.shippingcharge}</td>
              </tr>
              <tr>
                <td colSpan={2} style={{ textAlign: "right", fontWeight: "bold" }}>Total</td>
                <td>{orderdetail.amount}</td>
              </tr>
            </tbody>
          </Table>
        </div>

        {/* Right side: Shipping + Payment info */}
        <div className="info-sections">
          <div className="shipping-info">
            <h3>Shipping Information</h3>
            <p><strong>Name:</strong>{customerdetail.name}</p>
            <p><strong>Email:</strong> {customerdetail.email}</p>
            <p><strong>Phone:</strong> {customerdetail.number}</p>
            <p><strong>Address:</strong> {customerdetail.address}</p>
            <p><strong>City:</strong> {customerdetail.city}</p>
            <p><strong>State:</strong> {customerdetail.state}</p>
          </div>

          <div className="payment-info">
            <h3>Payment Details</h3>
            <p><strong>Method:</strong> {orderdetail.ordermethod}</p>
            <p><strong>Status:</strong> <span className="status paid">{orderdetail.paymentstatus}</span></p>
          </div>
        </div>
      </div>
      <div className="button-area">
            <Button variant="secondary" className="continue-shopping" onClick={()=>{nav("/home"); window.scrollTo(0, 0);}}><span>Continue Shopping</span></Button>
      </div>
      </div>
    </>
  );
};

export default OrderDetail;
