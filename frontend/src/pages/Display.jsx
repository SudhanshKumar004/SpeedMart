// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import "./Display.css";
// import {useNavigate} from "react-router-dom"

// const Display = () => {
//   const [mydata, setMydata] = useState([]);
//   const nav = useNavigate()

//  const loadData = async () => {
//       let response = await axios.get("http://localhost:8080/user/datadisplay");
//       setMydata(response.data);
//     };

//   useEffect(() => {
//     loadData();
//   }, []);

//   return (
//     <>
//       <h1>Display</h1>
//       <hr />

//       {mydata.map((key) => (
//         <div>
    
//           <img
//             src={`http://localhost:8080/${key.defaultImage}`} width={400} height={250} alt="Main"
//              onClick={()=>{nav(`/showproduct/${key._id}`)}}/>

//           <br />

//           {key.images.map((img) => (
//             <img src={`http://localhost:8080/${img}`} height={60} width={80} className="thumbnail"
//             />
//           ))}

//           <h1>Product: {key.product}</h1>
//           <h1>Brand: {key.brand}</h1>
//           <h1>Price: {key.price}</h1>
//         </div>
//       ))}
//     </>
//   );
// };

// export default Display;
