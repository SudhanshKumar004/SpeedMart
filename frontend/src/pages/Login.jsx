import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/Registration.css'
import API_URL from '../config/BaseURL'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'


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
 <div className="registration-container">
            <div className="form-image">
                <img src="https://static.vecteezy.com/system/resources/previews/009/743/124/non_2x/shoes-sketch-illustration-vector.jpg" alt="Registration" className="registration-image" />
            </div>
            <div className="form-side">
                <h1 className="reg-head" align="center">Login</h1>
                <Form className="reg-form">
                    
                    <Form.Group className="sm-1" controlId="formBasicEmail">
                        <Form.Control type="email" name='email' value={input.email || ''} onChange={handleInput} placeholder='Enter Email' />
                    </Form.Group>

                    <Form.Group className="sm-1" controlId="formBasicPassword">
                        <Form.Control type="password" name='password' value={input.password || ''} onChange={handleInput} placeholder='Enter Password' />
                    </Form.Group>

                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>

                    <h4>Don't have an account? <Link to="/registration">Register Here</Link></h4>
                </Form>
            </div>
        </div>
    </>
  )
}

export default Login
