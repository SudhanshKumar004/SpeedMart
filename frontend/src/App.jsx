import React from 'react'
import {BrowserRouter , Route ,Routes} from "react-router-dom"
import Layout from './Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Bookings from './pages/Bookings'
import Admin from './pages/Admin'
import Categories from './pages/Categories'
import AdminDashboard from './admin/AdminDashboard'
import AddProduct from './admin/AddProduct'
import ManageProduct from './admin/ManageProduct'
import Orders from './admin/Orders'
const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Layout />} >
          <Route path='home' element={<Home />} />
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='registration' element={<Registration />} />
          <Route path='booking' element={<Bookings />} />
          <Route path='admin' element={<Admin />} />
          <Route path='categories' element={<Categories/>} />
        </Route>
      </Routes>

      <Routes>
        <Route path='admindashboard' element={<AdminDashboard />} >
          <Route path='addproduct' element={<AddProduct />} />
          <Route path='manageproduct' element={<ManageProduct />} />
          <Route path='orders' element={<Orders />} />
        </Route>

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
