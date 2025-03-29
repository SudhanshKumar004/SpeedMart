import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import '../css/Home.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';


const Home = () => {


  const nav = useNavigate();

  const handlenav=()=>{
    nav("/registration")
  }
  return (
    <>
      <div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="" class="d-block w-100" alt="..." />
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
<hr />
<div className="cards">
<Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>Products</Card.Title>
        <Card.Text>
          Mobile
        </Card.Text>
        <Button variant="primary" onClick={handlenav}>Buy Now</Button>
      </Card.Body>
    </Card>
<Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>Products</Card.Title>
        <Card.Text>
          Mobile
        </Card.Text>
        <Button variant="primary" onClick={handlenav}>Buy Now</Button>
      </Card.Body>
    </Card>
<Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>Products</Card.Title>
        <Card.Text>
          Mobile
        </Card.Text>
        <Button variant="primary" onClick={handlenav}>Buy Now</Button>
      </Card.Body>
    </Card>

    </div>
    </>
  )
}
export default Home
