import React from "react";
import "../css/StepProgressBar.css";

const StepProgressBar = ({ currentStep }) => {
  const steps = ["Cart", "Checkout", "Payment", "Success"];

  return (
    <div className="progress-container">
      {steps.map((i, index) => (
        <div className="step-wrapper">
          <div className={`circle ${index <= currentStep ? "active" : ""}`}>
            {index + 1}
          </div>

          <div className="label">{i}</div>
          {index < steps.length - 1 && (
            <div className={`line ${index < currentStep ? "active" : ""}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepProgressBar;
