import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminNavbar(props) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/AdminHome">
            Steel House
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/AdminHome"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/About">
                  ShowUsers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Sell">
                  Sell
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Transaction">
                  Transaction
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/TrackOrder">
                  Orders
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Products
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/addProduct">
                    Add Product
                  </Link>
                  <Link className="dropdown-item" to="/EditProduct">
                    Edit Product
                  </Link>
                </div>
              </li>
            </ul>

            <form className="d-flex" role="search">
              {props.isLoggedIn ? (
                <div className="dropdown">
                  <button
                    className="btn btn-outline-success dropdown-toggle"
                    type="button"
                    id="dropdownmenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {props.username}
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link className="btn btn-outline-success" to="/Login">
                  Login
                </Link>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default AdminNavbar;
