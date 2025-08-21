import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../config/BaseURL";
import axios from "axios";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { addItem } from "../CartSlice";
import { useDispatch } from "react-redux";
import "../css/categoryCard.css";

const Drinks = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();

  const loadProduct = async () => {
    let api = `${API_URL}/admin/categoryproduct`;
    try {
      const response = await axios.post(api, { id: id });
      console.log(response.data);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const productShow = product.map((key) => {
    let discount = key.price - (key.price * 10) / 100;
    return (
      <>
        <Card className="category-card">
          <Card.Img variant="top" src={`${API_URL}/${key.defaultImage}`} />
          <Card.Body>
            <Card.Title className="card-title">{key.name}</Card.Title>
            <Card.Text className="card-text">
              <h4>{key.description}</h4>
              <h2>
                {" "}
                Price : ₹{discount}/-{" "}
                <h3>
                  <s>
                    <i>₹{key.price}</i>
                  </s>
                </h3>
              </h2>
            </Card.Text>
            <Button
              onClick={() => {
                dispatch(
                  addItem({
                    id: key._id,
                    name: key.name,
                    description: key.description,
                    Brand: key.Brand,
                    Category: key.Category,
                    price: discount,
                    defaultImage: key.defaultImage,
                    images: key.images,
                    qnty: 1,
                  })
                );
              }}
            >
              Add to Cart
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  });

  return (
    <>
      <h1 className="category-title">Drinks & snacks🍹</h1>
      <div className="fruit-container">{productShow}</div>
    </>
  );
};

export default Drinks;
