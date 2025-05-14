import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/BaseURL';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState('');

  const handleInput = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    setImage(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const api = `${API_URL}/admin/updateproduct/${id}`;

    const formData = new FormData();
    for (let key in product) {
      formData.append(key, product[key]);
    }

    for (let i = 0; i < image.length; i++) {
      formData.append('images', image[i]);
    }

    try {
      const response = await axios.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data);
    } catch (error) {
      console.error(error);
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
  }, []);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            value={product.name || ''}
            name="name"
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={product.description || ''}
            name="description"
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicBrand">
          <Form.Label>Brand</Form.Label>
          <Form.Select
            value={product.Brand || ''}
            name="Brand"
            onChange={handleInput}
          >
            <option>Select Brand</option>
            <option value="Nike">Nike</option>
            <option value="Puma">Puma</option>
            <option value="Adidas">Adidas</option>
            <option value="Asics">Asics</option>
            <option value="New Balance">New Balance</option>
            <option value="Sparx">Sparx</option>
            <option value="Reebok">Reebok</option>
            <option value="Bata">Bata</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCategory">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={product.Category || ''}
            name="Category"
            onChange={handleInput}
          >
            <option>Select Category</option>
            <option value="Sports">Sports</option>
            <option value="Sneakers">Sneakers</option>
            <option value="Boots">Boots</option>
            <option value="Casual">Casual</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="number"
            value={product.price || ''}
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
          Submit
        </Button>
      </Form>
    </>
  );
};

export default EditProduct;
