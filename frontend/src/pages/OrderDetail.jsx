import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "../css/orderdetail.css";
import API_URL from "../config/BaseURL";
import axios from "axios";
const OrderDetail = () => {
    const [orderdetail, setOrderdetail] = useState({});
    const [customerdetail, setCustomerdetail] = useState({});

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
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);
  return (
    <>
    <div className="order-container">
      <h1 className="page-title">Order Details</h1>
      <div className="order-detail-container">

        {/* Left side: Order info + product table */}
        <div className="order-info-section">
          <h2>Order #{orderdetail.ordernumber}</h2>
          <p><strong>Order Date:</strong> {new Date(orderdetail.orderAt).toLocaleDateString()}</p>
          <p><strong>Status:</strong> <span className="status shipped">Shipped</span></p>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Wireless Headphones</td>
                <td>1</td>
                <td>₹2000</td>
                <td>₹2000</td>
              </tr>
              <tr>
                <td>Phone Case</td>
                <td>2</td>
                <td>₹300</td>
                <td>₹600</td>
              </tr>
              <tr>
                <td colSpan={3} style={{ textAlign: "right", fontWeight: "bold" }}>Subtotal</td>
                <td>₹2600</td>
              </tr>
              <tr>
                <td colSpan={3} style={{ textAlign: "right" }}>GST (12%)</td>
                <td>₹312</td>
              </tr>
              <tr>
                <td colSpan={3} style={{ textAlign: "right" }}>Shipping Charge</td>
                <td>₹50</td>
              </tr>
              <tr>
                <td colSpan={3} style={{ textAlign: "right", fontWeight: "bold" }}>Total</td>
                <td>₹2962</td>
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
            <Button variant="primary" className="btn-contact-support">Contact Support</Button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default OrderDetail;
