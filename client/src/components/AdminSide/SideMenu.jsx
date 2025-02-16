import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";

function SideMenu({ isLoggedIn, username, children }) {
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    window.location.reload();
  };

  const toggleProductsDropdown = () =>
    setShowProductsDropdown(!showProductsDropdown);
  const toggleAccountDropdown = () =>
    setShowAccountDropdown(!showAccountDropdown);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#001251",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: "55px",
          left: 0,
          bottom: 0,
        }}
      >
        <h2>Dashboard</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li style={{ padding: "10px 0" }}>
            <Link
              to="/"
              className={location.pathname === "/" ? "active" : ""}
              style={{
                color: location.pathname === "/" ? "black" : "white",
                backgroundColor:
                  location.pathname === "/" ? "white" : "transparent",
                textDecoration: "none",
                borderRadius: "8px",
                padding: "10px 15px",
              }}
            >
              Home
            </Link>
          </li>
          <li style={{ padding: "10px 0" }}>
            <Link
              to="/About"
              className={location.pathname === "/About" ? "active" : ""}
              style={{
                color: location.pathname === "/About" ? "black" : "white",
                backgroundColor:
                  location.pathname === "/About" ? "white" : "transparent",
                textDecoration: "none",
                borderRadius: "8px",
                padding: "10px 15px",
              }}
            >
              ShowUsers
            </Link>
          </li>
          <li style={{ padding: "10px 0" }}>
            <Link
              to="/Sell"
              className={location.pathname === "/Sell" ? "active" : ""}
              style={{
                color: location.pathname === "/Sell" ? "black" : "white",
                backgroundColor:
                  location.pathname === "/Sell" ? "white" : "transparent",
                textDecoration: "none",
                borderRadius: "8px",
                padding: "10px 15px",
              }}
            >
              Sell
            </Link>
          </li>
          <li style={{ padding: "10px 0" }}>
            <Link
              to="/Transaction"
              className={location.pathname === "/Transaction" ? "active" : ""}
              style={{
                color: location.pathname === "/Transaction" ? "black" : "white",
                backgroundColor:
                  location.pathname === "/Transaction"
                    ? "white"
                    : "transparent",
                textDecoration: "none",
                borderRadius: "8px",
                padding: "10px 15px",
              }}
            >
              Transaction
            </Link>
          </li>
          <li style={{ padding: "10px 0" }}>
            <Link
              to="/TrackOrder"
              className={location.pathname === "/TrackOrder" ? "active" : ""}
              style={{
                color: location.pathname === "/TrackOrder" ? "black" : "white",
                backgroundColor:
                  location.pathname === "/TrackOrder" ? "white" : "transparent",
                textDecoration: "none",
                borderRadius: "8px",
                padding: "10px 15px",
              }}
            >
              Orders
            </Link>
          </li>
          <li style={{ padding: "10px 0" }}>
            <Link
              to="/ShowInventory"
              className={location.pathname === "/ShowInventory" ? "active" : ""}
              style={{
                color:
                  location.pathname === "/ShowInventory" ? "black" : "white",
                backgroundColor:
                  location.pathname === "/ShowInventory"
                    ? "white"
                    : "transparent",
                textDecoration: "none",
                borderRadius: "8px",
                padding: "10px 15px",
              }}
            >
              Inventory
            </Link>
          </li>

          {/* Products Dropdown
          <li style={{ padding: "10px 0" }}>
            <div
              style={{
                cursor: "pointer",
                color: "white",
                textDecoration: "none",
                marginLeft: "15px",
              }}
              onClick={toggleProductsDropdown}
            >
              Products
            </div>
            {showProductsDropdown && (
              <div style={{ marginLeft: "25px" }}>
                <Link
                  to="/addProduct"
                  className={
                    location.pathname === "/addProduct" ? "active" : ""
                  }
                  style={{
                    color: "white",
                    textDecoration: "none",
                    display: "block",
                  }}
                >
                  Add Product
                </Link>
                <Link
                  to="/EditProduct"
                  className={
                    location.pathname === "/EditProduct" ? "active" : ""
                  }
                  style={{
                    color: "white",
                    textDecoration: "none",
                    display: "block",
                  }}
                >
                  Edit Product
                </Link>
              </div>
            )}
          </li> */}
        </ul>

        {/* Account Dropdown */}
        <div style={{ marginTop: "auto", position: "relative" }}>
          {isLoggedIn ? (
            <div
              style={
                {
                  // marginLeft: "30px",
                }
              }
            >
              <div
                style={{
                  cursor: "pointer",
                  color: "black",
                  width: "auto",
                  textDecoration: "none",
                  backgroundColor: "white",
                  padding: "10px 25px",
                  // textTransform: "uppercase",
                  borderRadius: "5px",
                  textAlign: "center",
                }}
                onClick={toggleAccountDropdown}
              >
                {username.charAt(0).toUpperCase() +
                  username.slice(1).toLowerCase()}
              </div>
              {showAccountDropdown && (
                <button
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "none",
                    padding: "10px 69.9px",
                    cursor: "pointer",
                    width: "auto",
                    borderRadius: "5px",
                    position: "absolute", // Makes it appear above the username
                    top: "-55px", // Adjust position above username
                  }}
                  onClick={handleLogout}
                >
                  <LuLogOut className="me-1 mb-1 h6" />
                  Logout
                </button>
              )}
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
        <div
          style={{
            textAlign: "center",
            marginTop: "3px",
            fontSize: "12px",
          }}
        >
          {" "}
          <Link
            type="button"
            to="/AdminSignup"
            style={{
              color: "white",
            }}
          >
            Create Admin Account
          </Link>
        </div>
      </div>
      {/* Main content */}
      <div
        style={{
          marginLeft: "250px", // Offset the width of the sidebar
          padding: "20px",
          width: "100%",
          backgroundColor: "#f1f1f1",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default SideMenu;
