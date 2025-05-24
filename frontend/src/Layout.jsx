import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import NavBar from './components/Navbar';
import Contact from './components/ContactUs';



  const Layout = () => {

  
    return (
      <>
      <NavBar />
      
      <Outlet />

      <Footer />
      </>
    )
  }

  export default Layout
