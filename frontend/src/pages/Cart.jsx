import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import API_URL from '../config/BaseURL';
import Table from 'react-bootstrap/Table';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { cartClear, removeItem } from '../CartSlice';
import { CiCirclePlus,  CiCircleMinus } from "react-icons/ci";
import { quantityDec, quantityInc } from '../CartSlice';
import { useNavigate } from 'react-router-dom';
import '../css/cart.css'
import StepProgressBar from '../components/StepProgressBar';
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from 'react-toastify';

toast

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
                <td>{key.price}</td>
                <td>
                   <div className="quantity-container">
                    <CiCircleMinus className='quantity-icon' onClick={()=>{dispatch(quantityDec({id:key.id}));}} />
                    {key.qnty}
                    <CiCirclePlus className='quantity-icon'  onClick={()=>{dispatch(quantityInc({id:key.id}));}} />
                    </div>
                </td>
                <td>{key.qnty * key.price}</td>
                <td><MdOutlineDeleteOutline className='delete-icon' fontSize={25} cursor={"pointer"} onClick={()=>{dispatch(removeItem({id:key.id}))}} /></td>
            </tr>
            
            </>
        )
    })
    
  return (
    <>
    <StepProgressBar currentStep={0} />

<div className="head">
          <div></div>
          <h1></h1>
          <button onClick={() => {nav("/home");}}><IoMdArrowRoundBack /></button>
        </div>
    {Products.length === 0 ? <h1 className='empty-cart'>Nothing here yet... your cart is feeling lonely! 🛒</h1> : 
    
    <div className="cart-container">
        <div className="cart-header">
     <h1>Your Cart {Products.length === 1 ? `(${Products.length} item)` : `(${Products.length} items)`}</h1> 
     </div>
     <span><button className='clear-btn' onClick={()=>{dispatch(cartClear({id:"all"}))}}>Clear Cart</button></span>
     <Table striped bordered hover className='cart-table'>
      <thead>
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th>Description</th>
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
    <button className='checkout-btn' onClick={()=>{nav("/checkout"); window.scrollTo(0, 0);}}>CheckOut</button>
      </div>
    </div>
    }
    
    </>
  )
}

export default Cart
