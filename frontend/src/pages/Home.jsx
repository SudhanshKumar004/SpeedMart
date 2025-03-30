import Carousel from 'react-bootstrap/Carousel';
import '../css/Home.css'

const MovieCarousel = () => {
  return (
    <Carousel className="movie-carousel">
      <Carousel.Item>
        <img
          className="d-block w-100 zoom-in"
          src="https://m.media-amazon.com/images/I/71XlLHgkLFL.jpg"
          alt="Movie 1"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 zoom-in"
          src="https://wallpapercave.com/wp/wp10387943.jpg"
          alt="Movie 2"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 zoom-in"
          src="https://www.tallengestore.com/cdn/shop/products/Jurassic_Park_-_Tallenge_Hollywood_Movie_Poster_Collection_745d5009-8298-4bf9-9efa-fd77fd18131a.jpg?v=1577693343"
          alt="Movie 3"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default MovieCarousel;
