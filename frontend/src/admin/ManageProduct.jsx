import React, { useEffect, useState } from 'react'
import axios from 'axios'
import API_URL from "../config/BaseURL"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../css/manageproduct.css'
import { useNavigate } from 'react-router-dom';


const ManageProduct = () => {

  const [product, setProduct] = useState([])
  const nav = useNavigate(); 

  const loadData = async () =>{
    let api = `${API_URL}/admin/showallproduct`;
    try {
      const response = await axios.get(api);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  }


  const editproduct = (id) => {
    nav(`/admindashboard/editproduct/${id}`);
  }

  useEffect(()=>{
    loadData();
  },[])

   const productShow = product.map((key)=>{
        return(
          <>  
          <tr>
        <td><img src={`${API_URL}/${key.defaultImage}`} alt={key.name} className="product-img" /></td>
        <td>{key.name}</td>
        <td>{key.description}</td>
        <td>₹{key.price}</td>
        <td>
          <button className="edit-btn" onClick={() => editproduct(key._id)}>Edit Product</button>
        </td>
      </tr>
          </>
        )
      })


  return (
    <>
      <h1 className="manage-title">Manage Product</h1>
      <div className="table-wrapper">

        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {productShow}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ManageProduct
