import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/Registration.css'
import API_URL from '../config/BaseURL'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const Login = () => {
    const nav = useNavigate()

    const [input,setInput] = useState({})

    const handleInput = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setInput(values=>({...values,[name]:value}))
        console.log(input);
        
    }



    const handleSubmit = async()=>{
        let api = `${API_URL}/user/login`
        try {
            let response = await axios.post(api, input)
            alert("Login Successfull");
            nav('/booking')

            console.log(response.data);
            localStorage.setItem("name", response.data.name);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("userid", response.data._id);
        } 
        
        catch (error) {
            alert(error.response.data);
        }
    }
  return (
    <>

    <h1 className="reg-head" align="center">Login</h1>
      <Form className='reg-form'>
      
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Enter Email:</Form.Label>
        <Form.Control type="email" name='email' value={input.email} onChange={handleInput} />
      </Form.Group>

      
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Create Pasword:</Form.Label>
        <Form.Control type="text" name='password' value={input.password} onChange={handleInput}/>
      </Form.Group>


      <Button variant="primary" onClick={handleSubmit}>
        Login
      </Button>
    </Form>
    </>
  )
}

export default Login
