import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/Registration.css'
import API_URL from '../config/BaseURL'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const Registration = () => {
    const nav = useNavigate()

    const [input,setInput] = useState({})


    const handleInput = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setInput(values=>({...values,[name]:value}))
        console.log(input);
        
    }

    const handleSubmit = async()=>{
        let api = `${API_URL}/user/registration`
        try {
            let response = await axios.post(api, input)
            alert(response.data);
            nav("/login")
        } 
        
        catch (error) {
            console.log(error.response.data);
            alert(error.response.data)
        }
    }
  return (
    <>

    <h1 className="reg-head" align="center">Register Now</h1>
      <Form className='reg-form'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Full Name:</Form.Label>
        <Form.Control type="text" name='name' value={input.name} onChange={handleInput} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Enter Age:</Form.Label>
        <Form.Control type="text" name='age' value={input.age} onChange={handleInput} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Enter Number:</Form.Label>
        <Form.Control type="text" name='number' value={input.number} onChange={handleInput} />
      
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Enter Email:</Form.Label>
        <Form.Control type="email" name='email' value={input.email} onChange={handleInput} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Address:</Form.Label>
        <Form.Control type="text" name='address' value={input.address} onChange={handleInput} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>City:</Form.Label>
        <Form.Control type="text" name='city' value={input.city} onChange={handleInput}/>
      </Form.Group>
    

      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    </>
  )
}

export default Registration
