import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ShowProduct = () => {
    const {id} = useParams();

    const [mydata, setMydata] = useState({});
    const [mainImage,setMainImage] = useState("");
    const [myImages, setMyImages] = useState([])


     const loadData = async () => {
      let api = "http://localhost:8080/user/productshow"
      let response = await axios.post(api, {id:id});
      console.log(response.data);
      setMydata(response.data);
      
      setMainImage(response.data.defaultImage);
      setMyImages(response.data.images)
        
    };

    const ans = myImages.map((key)=>{
        return(
        <>
    <img src={`http://localhost:8080/${key}`} alt="" width={100} 
    onMouseMove={()=>{setMainImage(key)}}/>
    
    </>
    )
})

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
    <h1>Product</h1>

    <div style={{display:"flex"}}>
        <div width="10%">
    {ans}
        </div>
    
        <div width="90%">
    <img src={`http://localhost:8080/${mainImage}`} width={400} height={250} alt="Main"/>    
        </div>
    </div>
    </>
  )
}

export default ShowProduct
