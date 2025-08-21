import React, { useState } from "react";
import "../css/faq.css"; // optional if you're styling it

const faqData = [
  {
    question: "How fast is delivery?",
    answer: "We deliver within 15 minutes of order confirmation.",
  },
  {
    question: "What if I receive a damaged product?",
    answer:
      "You can request a replacement within 7 days of delivery through your order history page.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "No, once an order is placed it cannot be canceled as we begin processing immediately",
  },
  {
    question: "Which payment methods are accepted?",
    answer:
      "We accept UPI, Credit/Debit Cards, Cash on Delivery, and Net Banking.",
  },
  {
    question: "Is there a delivery charge?",
    answer:
      "Delivery is free for orders above ₹499. Below that, a ₹50 fee applies.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="faq-wrapper">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqData.map((faq, i) => (
          <div className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(i)}>
              {faq.question}
              <span className="toggle-icon">{openIndex === i ? "-" : "+"}</span>
            </div>
            {openIndex === i && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
