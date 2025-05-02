import React, { useContext } from 'react'
import { MyContext } from '../LoginContext'
const Checkout = () => {
  const {logedIn} = useContext(MyContext);
  return (
    <>
     <h1>Checkout Page</h1> 
    </>
  )
}

export default Checkout
