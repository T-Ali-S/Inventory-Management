import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminSidebar(props) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    window.location.reload();
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#111",
          padding: "20px",
          color: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* <h2>Steel House</h2> */}
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li style={{ padding: "10px 0" }}>
            <Link
              to="/AdminHome"
              style={{ color: "white", textDecoration: "none" }}
            >
              Home
            </Link>
          </li>
          <li style={{ padding: "10px 0" }}>
            <Link
              to="/About"
              style={{ color: "white", textDecoration: "none" }}
            >
              ShowUsers
            </Link>
          </li>
          <li style={{ padding: "10px 0" }}>
            <Link to="/Sell" style={{ color: "white", textDecoration: "none" }}>
              Sell
            </Link>
          </li>
          <li style={{ padding: "10px 0" }}>
            <Link
              to="/Transaction"
              style={{ color: "white", textDecoration: "none" }}
            >
              Transaction
            </Link>
          </li>
          <li style={{ padding: "10px 0" }}>
            <Link
              to="/TrackOrder"
              style={{ color: "white", textDecoration: "none" }}
            >
              Orders
            </Link>
          </li>
          <li style={{ padding: "10px 0" }}>
            <Link
              to="/ShowInventory"
              style={{ color: "white", textDecoration: "none" }}
            >
              Inventory
            </Link>
          </li>
          <li style={{ padding: "10px 0" }}>
            <div style={{ color: "white", textDecoration: "none" }}>
              Products
              <div style={{ marginLeft: "15px" }}>
                <Link
                  to="/addProduct"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Add Product
                </Link>
                <br />
                <Link
                  to="/EditProduct"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Edit Product
                </Link>
              </div>
            </div>
          </li>
        </ul>

        <div style={{ marginTop: "auto" }}>
          {props.isLoggedIn ? (
            <div>
              <span>{props.username}</span>
              <button
                style={{
                  backgroundColor: "#555",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/Login"
              style={{
                backgroundColor: "#555",
                color: "white",
                textDecoration: "none",
                padding: "10px 15px",
                display: "block",
                textAlign: "center",
              }}
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <h1>Welcome to the Dashboard</h1>
        {/* Add main content here */}
      </div>
    </div>
  );
}

export default AdminSidebar;
