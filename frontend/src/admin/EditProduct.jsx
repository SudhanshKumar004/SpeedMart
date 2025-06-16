import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../config/BaseURL";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "../css/editproduct.css";


const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const nav = useNavigate();

  //for fetching categories
  const fetchCategories = async () => {
    let api = `${API_URL}/admin/getcategories`;
    try {
      const response = await axios.get(api);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //making controlled component
  const handleInput = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    setImage(e.target.files);
  };

  //for product details update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const api = `${API_URL}/admin/updateproduct/${id}`;

    const formData = new FormData();
    for (let key in product) {
      formData.append(key, product[key]);
    }

    for (let i = 0; i < image.length; i++) {
      formData.append("images", image[i]);
    }

    try {
      const response = await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data, {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
        closeOnClick: true,
        pauseOnHover: false,
      });

      nav("/admindashboard/manageproduct");
    } catch (error) {
      console.error(error);
    }
  };

  //for product delete
  const deleteProduct = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      reverseButtons: false,
    });

    if (result.isConfirmed) {
      try {
        const api = `${API_URL}/admin/deleteproduct`;
        await axios.post(api, { id: id });

        await Swal.fire({
          title: "Deleted!",
          text: "The product has been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        nav("/admindashboard/manageproduct");
      } catch (error) {
        console.log(error);
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: "Cancelled",
        text: "Your product is safe 🙂",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const loadData = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/editproduct/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
    fetchCategories();
  }, []);

  return (
    <>
    <div className="editproduct-form">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            value={product.name || ""}
            name="name"
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={product.description || ""}
            name="description"
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCategory">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={product.Category || ""}
            name="Category"
            onChange={handleInput}
          >
            <option>Select Category</option>
            {categories.map((item) => {
              return <option value={item._id}>{item.name}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="number"
            value={product.price || ""}
            name="price"
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            placeholder="Enter Product Image"
            multiple
            onChange={handleImage}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Product Details
        </Button>
      <Button onClick={deleteProduct} className="delete-btn">Delete Product</Button>
      </Form>
      </div>
    </>
  );
};

export default EditProduct;
