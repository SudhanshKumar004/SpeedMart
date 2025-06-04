import { useContext } from 'react'
import { MyContext } from '../LoginContext'
import '../css/searchresult.css'
import API_URL from '../config/BaseURL';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { addItem } from '../CartSlice';
import { useDispatch } from 'react-redux';

const SearchResult = () => {

    const {searchproduct} = useContext(MyContext);
    const dispatch = useDispatch();

    const mydata = searchproduct.map((key) => {
        let discount = key.price - (key.price * 10 / 100);
    return(
      <>  
      <Card className="category-card">
  <Card.Img variant="top" src={`${API_URL}/${key.defaultImage}`} />
  <Card.Body>
    <Card.Title className="card-title">{key.name}</Card.Title>
    <Card.Text className="card-text">
      <h4>{key.description}</h4>
      <h2> Price : ₹{discount}/- <h3><s><i>₹{key.price}</i></s></h3></h2> 
    </Card.Text>
    <Button onClick={() => {
      dispatch(addItem({
        id: key._id,
        name: key.name,
        description: key.description,
        Brand: key.Brand,
        Category: key.Category,
        price: key.price,
        defaultImage: key.defaultImage,
        images: key.images,
        qnty: 1
      }))
    }}>
      Add to Cart
    </Button>
  </Card.Body>
</Card>

      </>
    )
    })
  return (
    <>
    <div className="search-container">

        <h1>Search Result({searchproduct.length})</h1>

        
        <div className="card-container">
            {searchproduct.length === 0 ? <h1>No Result Found</h1> : mydata}
        </div>  
    </div>
    
    </>
  )
}

export default SearchResult
