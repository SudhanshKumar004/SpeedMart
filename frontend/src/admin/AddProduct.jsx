import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import API_URL from '../config/BaseURL';
import axios from 'axios';
import { useEffect } from 'react';
const AddProduct = () => {

    const [input,setInput] = useState({})
    const [image,setImage] = useState("")
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
      let api = `${API_URL}/admin/getcategories`;
      try {
        const response = await axios.get(api);
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    const handleInput = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setInput(values=>({...values, [name]:value}))
        console.log(input);
    }

    const handleImage=(e)=>{
        setImage(e.target.files);
        console.log(image);
    }

    const handleSubmit =async(e)=>{
        e.preventDefault();
        let api = `${API_URL}/admin/addproduct`;
        const formData = new FormData();
        for(let key in input)
        {
            formData.append(key, input[key]);
        }

        for(let i = 0;i<image.length;i++)
        {
            formData.append("images", image[i]);
        }

        try {
         const response = await axios.post(api, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
         });
         alert(response.data);  
        }
        catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        fetchCategories();
    },[]) 

  return (
    <>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Product Name" name='name' onChange={handleInput}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter Description" name='description' onChange={handleInput} />
      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="formBasicBrand">
        <Form.Label>Brand</Form.Label>
        <Form.Select aria-label="Default select example" name="Brand" onChange={handleInput}>
            <option>Select Brand</option>
            <option value="Nike">Nike</option>
            <option value="Puma">Puma</option>
            <option value="Adidas">Adidas</option>
            <option value="Asics">Asics</option>
            <option value="New Balance">New Balance</option>
            <option value="Sparx">Sparx</option>
            <option value="Reebok">Reebok</option>
            <option value="Bata">Bata</option>
        </Form.Select>
      </Form.Group> */}
      
      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Category</Form.Label>
        <Form.Select aria-label="Default select example" name="Category" onChange={handleInput}>
            <option>Select Category</option>
            {
                categories.map((item)=>
                {
                    return <option value={item._id}>{item.name}</option>
                })  
            }
        </Form.Select>
      </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Product Price</Form.Label>
        <Form.Control type="number" placeholder="Enter Product Price" name='price' onChange={handleInput} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicImage">
        <Form.Label>Product Image</Form.Label>
        <Form.Control type="file" placeholder="Enter Product Image" multiple onChange={handleImage} />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    </>
  )
}

export default AddProduct
