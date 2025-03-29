import React from 'react'
import {BrowserRouter , Route ,Routes} from "react-router-dom"
import Layout from './Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Bookings from './pages/Bookings'
import Admin from './pages/Admin'
import TotalBookings from './pages/TotalBookings'
const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Layout />} >
        <Route path='home' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='registration' element={<Registration />} />
        <Route path='booking' element={<Bookings />} />
        <Route path='admin' element={<Admin />} />
        <Route path='totalbook' element={<TotalBookings />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
