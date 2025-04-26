import React from "react";
import "../css/admindash.css";
import { Link, Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <nav className="sidebar-nav">
          <ul>
            <Link to={"addproduct"}><li>Add Product</li></Link>
            <Link to={"manageproduct"}><li>Manage Product</li></Link>
            <Link to={"orders"}><li>Orders</li></Link>
          </ul>
        </nav>
      </div>

      <div className="main-content">
        {/* Navbar */}
        <div className="navbar">
          <h1 className="navbar-title">Admin Dashboard</h1>
          <div className="navbar-user">Admin</div>
        </div>

        {/* Dashboard Cards */}
       <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
