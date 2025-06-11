import React, { useEffect, useState } from "react";
import "../css/trackorder.css";
import { FaBox, FaCheckCircle, FaShippingFast, FaMapMarkedAlt, FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/BaseURL";
import axios from "axios";
import { FaHome } from "react-icons/fa";



const statuses = [
  { label: "Order Placed", icon: <FaClipboardList />, color: "#FFA500" },
  { label: "Order Confirmed", icon: <FaCheckCircle />, color: "#17A589" },
  { label: "Packed", icon: <FaBox />, color: "#3498DB" },
  { label: "Out for Delivery", icon: <FaShippingFast />, color: "#F39C12" },
  { label: "Delivered", icon: <FaCheckCircle />, color: "#28B463" }
];


const TrackOrder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [eta, setEta] = useState(15);
  const [orderdetail, setOrderdetail] = useState({});
  const nav = useNavigate();


  const loadData = async () => { 
      let api = `${API_URL}/customer/orderdetail`;
      try {
          let response =  await axios.post(api, {cusid : localStorage.getItem("cusid")});
          console.log(response.data);
          setOrderdetail(response.data);
      } catch (error) {
          console.log(error);
      }
  }

  useEffect(() => {
      loadData();
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < statuses.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 30000);

    const timer = setInterval(() => {
      setEta((prev) => (prev > 0 ? prev - 1 : 0));
    }, 8000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="track-wrapper">
        <div className="track-top">
      <button className="home-icon" onClick={()=>{nav("/home")}}><FaHome /></button>  
        </div>    
      <h2 className="track-heading">Track Your Order</h2>
      {/* Order Info */}
      <div className="order-card glass">
        <div className="info-row">
          <span>Order ID:</span>
          <strong>#{orderdetail.ordernumber}</strong>
        </div>
        <div className="info-row">
          <span>Customer:</span>
          <strong>{orderdetail.cusname}</strong>
        </div>
        <div className="info-row">
          <span>Contact:</span>
          <strong>{orderdetail.contact}</strong>
        </div>
        <div className="info-row">
          <span>Courier:</span>
          <strong className="tag">QuickX Courier</strong>
        </div>
        <div className="info-row">
          <span>Tracking ID:</span>
          <strong>QXC658244IND</strong>
        </div>
        <div className="eta-pill">
          ⏱ Estimated Delivery: <b>{eta} min</b>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="timeline-container">
        {statuses.map((step, index) => (
        <div className={`timeline-step ${index <= currentStep ? "active" : ""}`}>
        <div className="icon-circle" style={{ backgroundColor: index <= currentStep ? step.color : "#ccc" }}>{step.icon}</div>
        <p className="step-label">{step.label}</p>
      </div>
        ))}
      </div>
    </div>
  );
};

export default TrackOrder;
