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
        let api = `${API_URL}/customer/registration`
        try {
            let response = await axios.post(api, input)
            alert(response.data);
            // nav("/login")
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
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Enter Name:</Form.Label>
        <Form.Control type="text" name='name' value={input.name} onChange={handleInput} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Email:</Form.Label>
        <Form.Control type="email" name='email' value={input.email} onChange={handleInput} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label>Enter Number:</Form.Label>
        <Form.Control type="text" name='number' value={input.number} onChange={handleInput} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label>Enter Shipping Address:</Form.Label>
        <Form.Control type="text" name='address' value={input.address} onChange={handleInput} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>City:</Form.Label>
        <Form.Control type="text" name='city' value={input.city} onChange={handleInput}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicState">
        <Form.Label>Select State</Form.Label>
      <Form.Select aria-label="Default select example" name="state" value={input.state} onChange={handleInput}>
        <option>Select</option>
        <option value="Andhra Pradesh">Andhra Pradesh</option>
        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
        <option value="Assam">Assam</option>
        <option value="Bihar">Bihar</option>
        <option value="Chhattisgarh">Chhattisgarh</option>
        <option value="Goa">Goa</option>
        <option value="Gujarat">Gujarat</option>
        <option value="Haryana">Haryana</option>
        <option value="Himachal Pradesh">Himachal Pradesh</option>
        <option value="Jharkhand">Jharkhand</option>
        <option value="Karnataka">Karnataka</option>
        <option value="Kerala">Kerala</option>
        <option value="Madhya Pradesh">Madhya Pradesh</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Manipur">Manipur</option>
        <option value="Meghalaya">Meghalaya</option>
        <option value="Mizoram">Mizoram</option>
        <option value="Nagaland">Nagaland</option>
        <option value="Odisha">Odisha</option>
        <option value="Punjab">Punjab</option>
        <option value="Rajasthan">Rajasthan</option>
        <option value="Sikkim">Sikkim</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
        <option value="Telangana">Telangana</option>
        <option value="Tripura">Tripura</option>
        <option value="Uttar Pradesh">Uttar Pradesh</option>
        <option value="Uttarakhand">Uttarakhand</option>
        <option value="West Bengal">West Bengal</option>
      </Form.Select>
      </Form.Group>
    
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Create Password:</Form.Label>
        <Form.Control type="password" name='password' value={input.password} onChange={handleInput} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password:</Form.Label>
        <Form.Control type="password" name='cpassword' value={input.cpassword} onChange={handleInput} />
      </Form.Group>

      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    </>
  )
}

export default Registration
