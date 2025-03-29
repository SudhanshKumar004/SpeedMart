import React, { useState } from 'react'
import axios from 'axios'

const Insert = () => {
    const [input, setInput] = useState({})
    const [images , setSelectedImage] = useState([])

    const handleInput =(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setInput(values=>({...values, [name]:value}))
        console.log(input);
        
    }


    const handleImage=(e)=>{
        setSelectedImage(e.target.files);
        console.log(images);
        
    }

    const handleSubmit =async ()=>{

      let api = "http://localhost:8080/user/datasave";

      const formData = new FormData();
      for(let key in input)
      {
        formData.append(key, input[key])
      }

      for(let i=0;i<images.length;i++)
      {
        formData.append("images", images[i])
      }

      const response = await axios.post(api, formData)
      console.log(response.data);
      
    }
  return (
    <>
      <h1>Insert Data</h1>


      Enter Product Name: <input type="text" name="product" onChange={handleInput} /> <br />

      Enter Brand Name: <input type="text" name="brand" onChange={handleInput} /> <br />

      Enter Price: <input type="text" name="price" onChange={handleInput} /> <br />

      Add Images: <input type="file" multiple onChange={handleImage} /> <br />

      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}

export default Insert
