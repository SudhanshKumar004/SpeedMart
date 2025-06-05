import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/Registration.css';
import API_URL from '../config/BaseURL';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Registration = () => {
    const nav = useNavigate();

    const [input, setInput] = useState({});
    const [error, setError] = useState({});

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInput(values => ({ ...values, [name]: value }));
        setError(values => ({ ...values, [name]: "" }));
    };

    const validate = () =>{
        let error = {};
        if(!input.name){
            error.name = "Name is required";
        }
        if(!input.email){
            error.email = "Email is required";
        }
        if(!input.number){
            error.number = "Phone number is required";
        }
        if(!input.address){
            error.address = "Address is required";
        }
        if(!input.city){
            error.city = "City is required";
        }
        if(!input.state){
            error.state = "State is required";
        }
        if(!input.password){
            error.password = "Password is required";
        }
        setError(error);
    }

    const handleSubmit = async () => {
        if(!input.name || !input.email || !input.number || !input.address || !input.city || !input.state || !input.password){
            validate();
            return;
        }
        let api = `${API_URL}/customer/registration`;
        try {
            let response = await axios.post(api, input);
            localStorage.setItem("cusid", response.data.customer._id);
            toast.success(response.data.msg, {
                            position: "top-center",
                            autoClose: 2000,
                            theme: "colored",
                            closeOnClick: true,
                            pauseOnHover: false
                          });
            nav("/home");
        } catch (error) {
            toast.error(error.response.data, {
                          position: "top-center", 
                          autoClose: 2000,
                          theme: "colored",
                          closeOnClick: true,
                          pauseOnHover: false
                        });
        }
    };

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            
            try {
                const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d76f09d06414468b9479448aa75ac209`);
                const address = response.data.results[0].formatted;
                setInput(values => ({ ...values, address: address }));
            } catch (error) {
                alert("Failed to get address from location.");
            }
        }, (err) => {
            alert("Permission denied or failed to get location.");
        });
    };

    return (
        <div className="registration-container">
            <div className="form1-image">
                <img src="https://easydrawingguides.com/wp-content/uploads/2021/01/Chocolate-Bar-Step-10.png" alt="Registration" className="registration-image" />
            </div>
            <div className="form1-side">
                <h1 className="reg1-head" align="center">Register Now</h1>
                <Form className="reg1-form">
                    <Form.Group className="sm-1 " controlId="formBasicName">
                        <Form.Control type="text" name='name' value={input.name || ''} onChange={handleInput} placeholder='Enter Name' className={error.name ? "error" : ""} />
                    </Form.Group>

                    <Form.Group className="sm-1" controlId="formBasicEmail">
                        <Form.Control type="email" name='email' value={input.email || ''} onChange={handleInput} placeholder='Enter Email' className={error.email ? "error" : ""} />
                    </Form.Group>

                    <Form.Group className="sm-1" controlId="formBasicNumber">
                        <Form.Control type="text" name='number' value={input.number || ''} onChange={handleInput} placeholder='Enter Number' className={error.number ? "error" : ""}  />
                    </Form.Group>

                    <Form.Group className="sm-1" controlId="formBasicAddress">
                        <Button variant="secondary" onClick={getCurrentLocation} className="sm-1 location-btn">
                            📍 Use My Current Location
                        </Button>
                        <Form.Control type="text" name='address' value={input.address || ''} onChange={handleInput} placeholder='Enter Address'  className={error.address ? "error" : ""} />
                    </Form.Group>

                    <Form.Group className="sm-1" controlId="formBasicPassword">
                        <Form.Control type="text" name='city' value={input.city || ''} onChange={handleInput}  placeholder='Enter City' className={error.city ? "error" : ""} />
                    </Form.Group>

                    <Form.Group className="sm-1" controlId="formBasicState">
                        <Form.Select name="state" value={input.state || ''} onChange={handleInput} placeholder='Enter State' className={error.state ? "error" : ""} >
                            <option>Select State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Delhi NCR">Delhi NCR</option>
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

                    <Form.Group className="sm-1" controlId="formBasicPassword">
                        <Form.Control type="password" name='password' value={input.password || ''} onChange={handleInput} placeholder='Enter Password' className={error.password ? "error" : ""}  />
                    </Form.Group>

                    <Form.Group className="sm-1" controlId="formBasicPassword">
                        <Form.Control type="password" name='cpassword' value={input.cpassword || ''} onChange={handleInput} placeholder='Confirm Password'  />
                    </Form.Group>

                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>

                    <h4>By continuing, you agree to our <br /> <span style={{color:'red'}}>Terms of Service</span> & <span style={{color:'red'}}>Privacy Policy</span></h4>
                </Form>
            </div>
        </div>
    );
};

export default Registration;
