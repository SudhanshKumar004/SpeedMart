import React, { useEffect, useState } from "react";
import "../css/profile.css";
import API_URL from "../config/BaseURL";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Profile = () => {
  const [customerData, setCustomerData] = useState({});
  const [image, setImage] = useState("");

  const loadData = async () => {
    let api = `${API_URL}/customer/profileupdate`;
    try {
      let response = await axios.post(api, {
        cusid: localStorage.getItem("cusid"),
      });
      setCustomerData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCustomerData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("cusid", localStorage.getItem("cusid"));

    for (let key in customerData) {
      formData.append(key, customerData[key]);
    }

    for (let i = 0; i < image.length; i++) {
      formData.append("images", image[i]);
    }

    const api = `${API_URL}/customer/profileupdatedata`;
    try {
      const response = await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      toast.success(response.data, {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
        closeOnClick: true,
        pauseOnHover: false,
      });
    } catch (error) {
      console.log(error);
      alert("Failed to update profile. Please try again.");
    }
    loadData();
    window.scrollTo(0, 0);
  };

  const ImageDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove your profile picture!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "No, keep it",
      reverseButtons: false,
    });

    if (result.isConfirmed) {
      try {
        const api = `${API_URL}/customer/deleteimage`;
        await axios.post(api, { cusid: localStorage.getItem("cusid") });

        await Swal.fire({
          title: "Deleted!",
          text: "The product has been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        loadData();
      } catch (error) {
        console.log(error);
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: "Cancelled",
        text: "Your image is safe 🙂",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d76f09d06414468b9479448aa75ac209`
          );
          const address = response.data.results[0].formatted;
          setCustomerData((values) => ({ ...values, address: address }));
        } catch (error) {
          alert("Failed to get address from location.");
        }
      },
      (err) => {
        alert("Permission denied or failed to get location.");
      }
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <h1 className="profile-title">Profile</h1>
      <div className="Profile-container">
        <div className="customerImage">
          <img
            src={
              customerData.customerImage
                ? `${API_URL}/${customerData.customerImage}`
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Customer"
          />
          <input
            type="file"
            id="imageUpload"
            style={{ display: "none" }}
            onChange={(e) => setImage(e.target.files)}
          />
          <button
            type="button"
            className="edit-icon"
            onClick={() => document.getElementById("imageUpload").click()}
          >
            {" "}
            ✏️{" "}
          </button>
          <button type="button" className="delete-icon" onClick={ImageDelete}>
            ❌
          </button>
        </div>

        <Form className="profile-form" onSubmit={handleSubmit}>
          <Form.Group className="sm-1 " controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={customerData.name || ""}
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className="sm-1" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={customerData.email || ""}
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className="sm-1" controlId="formBasicNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="number"
              value={customerData.number || ""}
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className="sm-1" controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={customerData.address || ""}
              onChange={handleInput}
            />
            <Button
              variant="secondary"
              onClick={getCurrentLocation}
              className="sm-1 location-btn"
            >
              📍 Use My Current Location
            </Button>
          </Form.Group>

          <Form.Group className="sm-1" controlId="formBasicCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={customerData.city || ""}
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className="sm-1" controlId="formBasicState">
            <Form.Label>State</Form.Label>
            <Form.Select
              name="state"
              value={customerData.state || ""}
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

          <Button variant="primary" type="submit">
            Update Profile
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Profile;
