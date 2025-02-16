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
    <nav
      className="navbar fixed-top navbar-expand-lg bg-body-tertiary"
      // style={{ backgroundColor: "#111" }}
    >
      <div className="container-fluid">
        <div className="d-flex justify-content-center w-100">
          <Link
            to="/AdminHome"
            className="navbar-brand text-black fw-bold text-center"
          >
            Alloy Stewardship Application
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
