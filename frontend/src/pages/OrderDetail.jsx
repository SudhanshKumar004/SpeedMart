import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "../css/orderdetail.css";
import API_URL from "../config/BaseURL";
import axios from "axios";
const OrderDetail = () => {
    const [orderdetail, setOrderdetail] = React.useState({});

    const loadData = async () => {
        let api = `${API_URL}/customer/orderdetail`;
        try {
            let response =  await axios.post(api, {cusid : localStorage.getItem("cusid")});
            console.log(response.data);
            setOrderdetail(response.data);
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
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> john.doe@example.com</p>
            <p><strong>Phone:</strong> +91 9876543210</p>
            <p><strong>Address:</strong> 123, Main Street, Mumbai</p>
            <p><strong>City:</strong> Mumbai</p>
            <p><strong>State:</strong> Maharashtra</p>
          </div>

          <div className="payment-info">
            <h3>Payment Details</h3>
            <p><strong>Method:</strong> Credit Card</p>
            <p><strong>Transaction ID:</strong> TXN789456123</p>
            <p><strong>Status:</strong> <span className="status paid">Paid</span></p>
            <p><strong>Date:</strong> 2025-06-04</p>
            <Button variant="primary" className="btn-contact-support">Contact Support</Button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default OrderDetail;
