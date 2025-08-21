import React, { useEffect, useState } from "react";
import "../css/admindash.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function AdminDashboard() {
  const nav = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 426);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logout = () => {
    localStorage.clear();
    nav("/home");
    toast.info("👋 Logged out successfully", {
      position: "top-center",
      autoClose: 2000,
      theme: "colored",
      closeOnClick: true,
      pauseOnHover: false,
    });
  };
  return (
    <div className="main-container">
      <div className="dashboard-container">
        <div className="sidebar">
          <h2 className="sidebar-title">Admin Panel</h2>
          <hr className="sidebar-divider" />
          <nav className="sidebar-nav">
            <ul>
              <Link to="addproduct">
                <li>
                  <span className="emojis">➕</span>
                  {isMobile ? "Add" : "Add Product"}{" "}
                </li>
              </Link>
              <Link to="manageproduct">
                <li>
                  <span className="emojis">🗂️</span>
                  {isMobile ? "Manage" : "Manage Product"}
                </li>
              </Link>
              <Link to="orders">
                <li>
                  <span className="emojis">📦</span> Orders
                </li>
              </Link>
            </ul>
          </nav>
        </div>

        <div className="main-content">
          <div className="admin-navbar">
            <h1 className="navbar-title">SpeedMart</h1>
            <div className="navbar-user">
              Welcome : {localStorage.getItem("admin")}👨🏻‍💻
            </div>
            <button onClick={logout}>Logout🚪</button>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
