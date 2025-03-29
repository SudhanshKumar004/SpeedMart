import React, { useEffect, useState } from 'react';
import API_URL from '../config/BaseURL';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const TotalBookings = () => {
    const [mydata, setMydata] = useState({});
    let userid = localStorage.getItem("userid")

    const loadData = async () => {
        let api = `${API_URL}/user/mybookings`;
        try {
            let response = await axios.post(api, {userid:userid});
            console.log(response.data);
            setMydata(response.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const handleSubmit =async(id)=>{
        let api = `${API_URL}/user/bookdelete`;
        try {
            let response = await axios.post(api, {bookid:id});
            alert(response.data);
            loadData();
        } catch (error) {
            console.log(error.response?.data || error.message);
        } 
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <h1 className='book-head'>My Bookings</h1>
            <hr />

            {mydata.length === 0 ? (<p style={{textAlign:"center", fontSize:"30px", color:"red"}}>No Bookings</p>) : (
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Date</th>
                        <th>Flight Name</th>
                        <th>Class</th>
                        <th>Amount</th>
                        <th>Cancel</th>
                    </tr>
                </thead>
                <tbody>
            
                        <tr key={mydata._id}>
                            <td>{mydata.from}</td>
                            <td>{mydata.to}</td>
                            <td>{mydata.date}</td>
                            <td>{mydata.flight}</td>
                            <td>{mydata.flightclass}</td>
                            <td>{mydata.amount}</td>
                            <td><button onClick={()=>{handleSubmit(mydata._id)}}>Cancel</button></td>
                        </tr>
                    
                </tbody>
            </Table>

            )}
        </>
    );
};

export default TotalBookings;
