import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Table, Alert } from "react-bootstrap";
import { FaBoxOpen } from "react-icons/fa";
import API_URL from "../config/BaseURL";
import "../css/orderhistory.css";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  let nav = useNavigate();

  const fetchOrders = async () => {
    try {
      const cusid = localStorage.getItem("cusid");
      const response = await axios.get(
        `${API_URL}/customer/orderhistory/${cusid}`
      );
      setOrders(response.data);
    } catch (err) {
      console.log("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Container className="mt-5 mb-5 order-history-container">
      <div className="history-top">
        <button
          className="home-icon"
          onClick={() => {
            nav("/home");
            window.scrollTo(0, 0);
          }}
        >
          <FaHome />
        </button>
      </div>
      <Card className="shadow-lg border-0 order-history-card">
        <Card.Header className="gradient-header">
          <h3 className="fw-bold mb-0">
            <FaBoxOpen className="me-2" /> Your Order History
          </h3>
        </Card.Header>
        <Card.Body className="history-card-body">
          {orders.length === 0 ? (
            <Alert variant="warning" className="text-center">
              No orders found.
            </Alert>
          ) : (
            <Table className="text-center modern-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Order No</th>
                  <th>Product</th>
                  <th>Total</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr>
                    <td>{new Date(order.orderAt).toLocaleDateString()}</td>
                    <td>{order.ordernumber}</td>
                    <td>{order.productname}</td>
                    <td>₹{order.totalamount}</td>
                    <td>{order.ordermethod}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderHistory;
