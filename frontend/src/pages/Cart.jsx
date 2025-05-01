import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import API_URL from '../config/BaseURL';
import Table from 'react-bootstrap/Table';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { removeItem } from '../CartSlice';
import { CiCirclePlus,  CiCircleMinus } from "react-icons/ci";
import { quantityDec, quantityInc } from '../CartSlice';
import { useNavigate } from 'react-router-dom';
import '../css/cart.css'


const Cart = () => {

    const Products = useSelector(state => state.myCart.cartItems);
    const dispatch = useDispatch();
    const nav = useNavigate();
    let totalAmnt = 0;

    const ans = Products.map((key)=>{
        totalAmnt += key.price * key.qnty;
        return(
            <>
            <tr>
                <td>
                    <img src={`${API_URL}/${key.defaultImage}`} alt="Item Image" width={80} height={80} />
                </td>

                <td data-label="Product Name">{key.name}</td>
                <td>{key.description}</td>
                <td>{key.Brand}</td>
                <td>{key.Category}</td>    
                <td>{key.price}</td>
                <td>
                    <CiCircleMinus className='quantity-icon' fontSize={30} onClick={()=>{dispatch(quantityDec({id:key.id}));}} />
                    {key.qnty}
                    <CiCirclePlus className='quantity-icon' fontSize={30} onClick={()=>{dispatch(quantityInc({id:key.id}));}} />
                </td>
                <td>{key.qnty * key.price}</td>
                <td><MdOutlineDeleteOutline className='delete-icon' fontSize={25} cursor={"pointer"} onClick={()=>{dispatch(removeItem({id:key.id}))}} /></td>
            </tr>
            </>
        )
    })
    
  return (
    <>
    <div className="cart-container">
        <div className="cart-header">
     <h1>My cart</h1> 
     <div className="total-amount">Total: ₹{totalAmnt}</div>
     </div>
    <button className='checkout-btn' onClick={()=>{nav("/checkout")}}>CheckOut</button>
     <Table striped bordered hover className='cart-table'>
      <thead>
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th>Description</th>
          <th>Brand</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {ans}
      </tbody>
    </Table>
    </div>
    </>
  )
}

export default Cart
