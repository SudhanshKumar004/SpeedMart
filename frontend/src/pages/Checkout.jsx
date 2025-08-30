import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../LoginContext";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import API_URL from "../config/BaseURL";
import { IoMdArrowRoundBack } from "react-icons/io";
import "../css/checkout.css";
import StepProgressBar from "../components/StepProgressBar";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormLabel from "react-bootstrap/esm/FormLabel";
import { toast } from "react-toastify";

const Checkout = () => {
  const { logedIn } = useContext(MyContext);
  const nav = useNavigate();
  const [customerData, setCustomerData] = useState({});
  const [newAddress, setNewAddress] = useState({});
  const [couponStatus, setCouponStatus] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [isNewAddress, setIsNewAddress] = useState(false);
  let totalAmnt = 0;
  let gst = 0;
  let shippingCharge = 50;
  const Products = useSelector((state) => state.myCart.cartItems);

  const productPrint = Products.map((key) => {
    totalAmnt += Math.round(key.price * key.qnty);
    gst = Math.round(totalAmnt * 0.12);

    return (
      <tr>
        <td>
          <img
            src={`${API_URL}/${key.defaultImage}`}
            alt="Item Image"
            width={80}
            height={80}
          />
        </td>
        <td>{key.name}</td>
        <td>{key.price}</td>
        <td>{key.qnty}</td>
        <td>{key.qnty * key.price}</td>
      </tr>
    );
  });

  const loadData = async () => {
    let api = `${API_URL}/customer/checkoutData`;
    try {
      let response = await axios.post(api, {
        cusid: localStorage.getItem("cusid"),
      });
      // console.log(response.data);
      setCustomerData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setNewAddress((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async () => {
    const api = `${API_URL}/customer/shippingData`;
    const datatosend = isNewAddress ? newAddress : customerData;

    const shippingPayload = {
      cusid: localStorage.getItem("cusid"),
      name: datatosend.name,
      email: datatosend.email,
      number: datatosend.number,
      address: datatosend.address,
      city: datatosend.city,
      state: datatosend.state,
    };

    try {
      const response = await axios.post(api, shippingPayload);
      console.log(response.data);
      nav("/paymentpage");
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
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
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d76f09d06414468b9479448aa75ac209`
        );
        const address = response.data.results[0].formatted;
        setNewAddress((values) => ({ ...values, address: address }));
      } catch (error) {
        alert("Failed to get address from location.");
        console.log(error);
      }
    });
  };

  useEffect(() => {
    if (!logedIn) {
      toast.error("Please login first", { position: "top-center" });
      nav("/home");
    }
    loadData();
  }, []);

  return (
    <>
      <StepProgressBar currentStep={1} />
      <div className="head">
        <div></div>
        <h1>Checkout Page</h1>
        <button
          onClick={() => {
            nav("/cart");
          }}
          className="back-button"
        >
          <IoMdArrowRoundBack />
        </button>
      </div>

      <div className="checkout-container">
        <div className="cus-info">
          <div className="button-space">
            {buttonStatus ? (
              <button
                className="add-new-address"
                onClick={() => {
                  setButtonStatus(false);
                  setIsNewAddress(false);
                }}
              >
                Go Back
              </button>
            ) : (
              <button
                className="add-new-address"
                onClick={() => {
                  setButtonStatus(true);
                  setIsNewAddress(true);
                }}
              >
                Add New Address
              </button>
            )}
          </div>
          {buttonStatus ? (
            <>
              <Form className="checkout-form">
                <h2 className="form-head">Customer Info</h2>
                <Form.Group className="form-group " controlId="formBasicName">
                  <Form.Label className="form-label">Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={newAddress.name || ""}
                    onChange={handleInput}
                  />
                </Form.Group>

                <Form.Group className="form-group" controlId="formBasicEmail">
                  <Form.Label className="form-label">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={newAddress.email || ""}
                    onChange={handleInput}
                  />
                </Form.Group>

                <Form.Group className="form-group" controlId="formBasicNumber">
                  <Form.Label className="form-label">Contact</Form.Label>
                  <Form.Control
                    type="text"
                    name="number"
                    value={newAddress.number || ""}
                    onChange={handleInput}
                  />
                </Form.Group>

                <h2 className="form-head">Shipping Address</h2>
                <Form.Group className="form-group" controlId="formBasicAddress">
                  <FormLabel className="form-label">Address</FormLabel>
                  <Button
                    variant="secondary"
                    onClick={getCurrentLocation}
                    className="sm-1 location-btn"
                  >
                    📍 Use My Current Location
                  </Button>
                  <Form.Control
                    type="text"
                    name="address"
                    value={newAddress.address || ""}
                    onChange={handleInput}
                  />
                </Form.Group>

                <Form.Group
                  className="form-group"
                  controlId="formBasicPassword"
                >
                  <Form.Label className="form-label">City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={newAddress.city || ""}
                    onChange={handleInput}
                  />
                </Form.Group>

                <Form.Group className="form-group" controlId="formBasicState">
                  <Form.Label className="form-label">State</Form.Label>
                  <Form.Select
                    type="text"
                    name="state"
                    value={newAddress.state || ""}
                    onChange={handleInput}
                  >
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
              </Form>

              <h4 className="details-bottom">
                *Your order will be delivered to this address
              </h4>
            </>
          ) : (
            <>
              <h2 className="details-head">Customer Info</h2>
              <div className="details-row">
                <span className="label">Name:</span>
                <span className="value">{customerData.name}</span>
              </div>
              <div className="details-row">
                <span className="label">Email:</span>
                <span className="value">{customerData.email}</span>
              </div>
              <div className="details-row">
                <span className="label">Contact:</span>
                <span className="value">{customerData.number}</span>
              </div>
              <hr />
              <h2 className="details-head">Shipping Address</h2>
              <div className="details-row">
                <span className="label">Address:</span>
                <span className="value">{customerData.address}</span>
              </div>
              <div className="details-row">
                <span className="label">City:</span>
                <span className="value">{customerData.city}</span>
              </div>
              <div className="details-row">
                <span className="label">State:</span>
                <span className="value">{customerData.state}</span>
              </div>
            </>
          )}
          <hr />
        </div>

        <div className="cart-item">
          <h2 className="item-head">Your Cart</h2>
          <div className="table-wrap">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>{productPrint}</tbody>
            </Table>
          </div>

          <div className="coupon">
            <input
              type="text"
              placeholder="Discount Code"
              style={{
                border: couponStatus ? "2px solid red" : "2px solid black",
              }}
            />
            <button
              onBlur={() => {
                setCouponStatus(false);
              }}
              onClick={() => {
                setCouponStatus(true);
              }}
            >
              Apply
            </button>
            {couponStatus && (
              <p style={{ color: "red" }}>Coupan is not valid</p>
            )}
            <h2 className="coupan-title">
              <span className="title-span">Item Subtotal :</span>
              <span className="amnt-span">₹{totalAmnt}</span>
            </h2>
            <h2 className="coupan-title">
              <span className="title-span">GST :</span>
              <span className="amnt-span">₹{gst}</span>
            </h2>
            <h2 className="coupan-title">
              <span className="title-span">Shipping Charge :</span>
              {totalAmnt > 499 ? (
                <span className="amnt-span">Free</span>
              ) : (
                <span className="amnt-span">₹{shippingCharge}</span>
              )}
            </h2>
            <hr />
            <h2 className="coupan-title">
              <span className="title2-span">Total Amount :</span>
              <span className="total-span">
                ₹{Math.round(totalAmnt + gst + shippingCharge)}
              </span>
            </h2>
          </div>
          <button
            className="pay-btn"
            onClick={() => {
              handleSubmit();
            }}
          >
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
