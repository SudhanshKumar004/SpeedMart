import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/Registration.css'
import API_URL from '../config/BaseURL'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const Bookings = () => {
    const nav = useNavigate()

    const [input,setInput] = useState({})
    const [mydata,setMydata] = useState({})
    const id = localStorage.getItem("userid")


    const loadData = async()=>{
     let api = `${API_URL}/user/userdata`
        try {
            let response = await axios.post(api, {"userid":id})
            console.log(response.data);
            setMydata(response.data)
        } 
        
        catch (error) {
            console.log(error.response.data);
            
        }
    }


    const handleInput = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setInput(values=>({...values,[name]:value}))
        console.log(input);
        
    }

    const handleSubmit = async () => {
    let api = `${API_URL}/user/booking`;
    try {
        let response1 = await axios.post(api, { ...input, id });
        alert(response1.data);
        nav("/totalbook");
    } catch (error) {
        console.log(error.response.data);
    }
};



    useEffect(()=>{
      loadData()
    },[])

    
  return (
    <>

    <h1 className="reg-head" align="center">Book Your Ticket</h1>
      <Form className='reg-form'>
      
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>From:</Form.Label>
        <Form.Control type="text" name='from' value={input.from} onChange={handleInput} />
      </Form.Group>

      
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>To:</Form.Label>
        <Form.Control type="text" name='to' value={input.to} onChange={handleInput}/>
      </Form.Group>

      
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Date:</Form.Label>
        <Form.Control type="date" name='date' value={input.date} onChange={handleInput}/>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Total Passangers:</Form.Label>
        <Form.Control type="number" name='total' value={input.total} onChange={handleInput}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Flight Name</Form.Label>   
        <Form.Control type="text" name='flight' value={input.flight} onChange={handleInput}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Total Amount</Form.Label>   
        <Form.Control type="text" name='amount' value={input.amount} onChange={handleInput}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Class</Form.Label>   
        <Form.Control type="text" name='flightclass' value={input.flightclass} onChange={handleInput}/>
      </Form.Group>

      <Button variant="primary" onClick={handleSubmit}>
        Book Flight
      </Button>
    </Form>
    </>
  )
}

export default Bookings
