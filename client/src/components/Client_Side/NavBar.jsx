import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { isLoggedIn, getUsername } from "./authCheck_AC/authCheck";

function NavBar(props) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  // const username = getUsername();
  // const loggedIn = isLoggedIn();

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <nav
        className="navbar fixed-top navbar-expand-lg bg-body-tertiary"
        style={{
          padding: "2px 10px", // Decrease the padding
          minHeight: "45px", // Decrease the height
          zIndex: "1000",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
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
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/TrackOrder"
                >
                  TrackOrder
                </Link>
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
                <Link
                  className="btn btn-outline-success"
                  to="/Login"
                  style={{
                    margin: "4px 0",
                  }}
                >
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

export default NavBar;
