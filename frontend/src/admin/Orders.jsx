import React, { useEffect, useState } from 'react'
import API_URL from '../config/BaseURL';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import '../css/orders.css'

const Orders = () => {
  const [order, setOrder] = useState([])  


  const getOrders =async () =>{
    let api = `${API_URL}/admin/getorders`;
    let response = await axios.get(api);
    console.log(response.data);
    setOrder(response.data);
  }

  let orderPrint = order.map((key) => {
    return (
      <>
        <tr>
          <td>#{key.ordernumber}</td>
          <td>{key.productname}</td>
          <td>{key.cusname}</td>
          <td>{key.totalamount}</td>
          <td>{key.address}</td>
          <td>{key.contact}</td>
          <td>{key.email}</td>
          <td>{key.ordermethod}</td>
          <td>{key.orderAt}</td>
        </tr>
      </>
    );
  });

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      <h1 className="orders-title">Orders</h1>

<div className="orders-table-container">
  <Table striped bordered hover className="orders-table">
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Product Name</th>
        <th>Customer Name</th>
        <th>Total Amount</th>
        <th>Shipping Address</th>
        <th>Contact</th>
        <th>Email</th>
        <th>Method</th>
        <th>Order Date</th>
      </tr>
    </thead>
    <tbody>
      {orderPrint}
    </tbody>
  </Table>
</div>

    </>
  )
}

export default Orders
