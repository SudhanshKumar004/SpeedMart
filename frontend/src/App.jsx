import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import AdminDashboard from './admin/AdminDashboard';
import AddProduct from './admin/AddProduct';
import ManageProduct from './admin/ManageProduct';
import Orders from './admin/Orders';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PaymentPage from './pages/PaymentPage';
import EditProduct from './admin/EditProduct';
import Electronics from './pages/Electronics';
import Beauty from './pages/Beauty';
import Fruits from './pages/Fruits';
import Drinks from './pages/Drinks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchResult from './pages/SearchResult';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='registration' element={<Registration />} />
          <Route path='cart' element={<Cart />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='paymentpage' element={<PaymentPage />} />
          <Route path='electronics/:id' element={<Electronics />}/>
          <Route path='beauty/:id' element={<Beauty />}/>
          <Route path='fruitpage/:id' element={<Fruits/>}/>
          <Route path='drinks/:id' element={<Drinks/>}/>
          <Route path='searchresult' element={<SearchResult />} />
        </Route>

        <Route path='admindashboard' element={<AdminDashboard />}>
          <Route path='addproduct' element={<AddProduct />} />
          <Route path='manageproduct' element={<ManageProduct />} />
          <Route path='orders' element={<Orders />} />
          <Route path='editproduct/:id' element={<EditProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer />
    </>
  );
};

export default App;
