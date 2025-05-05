import React, { useContext, useEffect } from 'react'
import { MyContext } from '../LoginContext'
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import API_URL from '../config/BaseURL';


const Checkout = () => {
  const {logedIn} = useContext(MyContext);
  const nav = useNavigate();


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

  useEffect(() => {
    if(!logedIn){
      alert("Please Login First");
      nav("/login");
    }
  }, [])



  return (
    <>
     <h1>Checkout Page</h1>


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
    </>
  )
}

export default Checkout
