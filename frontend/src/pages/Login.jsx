import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/login.css'
import API_URL from '../config/BaseURL'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { MyContext } from '../LoginContext';


const Login = () => {
    const nav = useNavigate()

    const [input,setInput] = useState({})

    const {logedIn, setLogedIn, userName, setUserName, userEmail, setUserEmail} = useContext(MyContext);

    const handleInput = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setInput(values=>({...values,[name]:value}))        
    }



    const handleSubmit = async(e)=>{
        e.preventDefault();
        let api = `${API_URL}/customer/login`
        try {
            let response = await axios.post(api, input)
            alert(response.data.msg);

        localStorage.setItem("token", response.data.token);
        setLogedIn(true); 
        nav("/home");
        } 
        
        catch (error) {
            alert(error.response.data.msg);
        }
    }
  return (
    <>
 <div className="login-container">
            <div className="form-image">
                <img src="https://i.pinimg.com/originals/b4/64/d5/b464d52e383bf2c0141bd51b9c4b0e7c.jpg" alt="Registration" className="login-image" />
            </div>
            <div className="form-side">
                <h1 className="login-head" align="center">Login</h1>
                <Form className="login-form">
                    
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
