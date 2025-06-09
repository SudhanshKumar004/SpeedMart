import React, { useEffect, useState } from "react";
import "../css/trackorder.css";
import { FaBox, FaCheckCircle, FaShippingFast, FaMapMarkedAlt, FaClipboardList } from "react-icons/fa";

const statuses = [
  { label: "Order Placed", icon: <FaClipboardList />, color: "#FFA500" },
  { label: "Order Confirmed", icon: <FaCheckCircle />, color: "#17A589" },
  { label: "Packed", icon: <FaBox />, color: "#3498DB" },
  { label: "Out for Delivery", icon: <FaShippingFast />, color: "#F39C12" },
  { label: "Delivered", icon: <FaCheckCircle />, color: "#28B463" }
];

const delayBetweenUpdates = 30000;

const TrackOrder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [eta, setEta] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < statuses.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, delayBetweenUpdates);

    const timer = setInterval(() => {
      setEta((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="track-wrapper">
      <h2 className="track-heading">Track Your Order</h2>

      {/* Order Info */}
      <div className="order-card glass">
        <div className="info-row">
          <span>Order ID:</span>
          <strong></strong>
        </div>
        <div className="info-row">
          <span>Customer:</span>
          <strong>Raja Fakeer Singh</strong>
        </div>
        <div className="info-row">
          <span>Contact:</span>
          <strong>+91 9999888876</strong>
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
          <div
            key={index}
            className={`timeline-step ${index <= currentStep ? "active" : ""}`}
          >
            <div
              className="icon-circle"
              style={{ backgroundColor: index <= currentStep ? step.color : "#ccc" }}
            >
              {step.icon}
            </div>
            <p className="step-label">{step.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackOrder;
