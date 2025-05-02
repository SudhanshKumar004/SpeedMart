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
    {Products.length === 0 ? <h1 className='empty-cart'>Nothing here yet... your cart is feeling lonely! 🛒</h1> : 
    
    <div className="cart-container">
        <div className="cart-header">
     <h1>Your Cart {Products.length === 1 ? `(${Products.length} item)` : `(${Products.length} items)`}</h1> 
     </div>
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
    <div className="checkout-footer">
     <div className="total-amount">Total: ₹{totalAmnt}</div>
     <hr className='checkout-hr' />
    <button className='checkout-btn' onClick={()=>{nav("/checkout")}}>CheckOut</button>
      </div>
    </div>
    }
    
    </>
  )
}

export default Cart
