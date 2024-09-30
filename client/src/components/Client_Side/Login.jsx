import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/login", { email, password })
      .then((result) => {
        if (result.data.success) {
          props.showAlert("Logged In", "success");
          // setEmail("");
          // setPassword("");
          props.setIsLoggedIn(true);
          props.setusername(result.data.username);
          localStorage.setItem("username", result.data.username);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("AdminCheck", JSON.stringify(false));
          navigate("/");
        } else {
          props.showAlert("Login Failed: " + result.data.message, "warning");
        }
      })
      .catch((err) => console.log(err)); // Fixed typo here
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="border-2 m-5 text-center">
          <div className="mt-5">
            <p className="h2">Login Form</p>
          </div>
          <div className="mt-5">
            <input
              type="email" // Changed to "email" for better validation
              value={email}
              placeholder="Enter Email Address"
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 text-center rounded-pill p-2"
              required
            />
          </div>
          <div className="mt-2">
            <input
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 rounded-pill text-center p-2"
              required
            />
          </div>
          <div className="mt-3">
            <Link to="/Signup" className=" text-decoration-none">
              Create an Account
            </Link>
          </div>
          <div className="mt-3">
            <Link to="/Adminlogin" className=" text-decoration-none">
              Admin Login
            </Link>
          </div>
          <button
            type="submit" // Ensure the button submits the form
            className="btn btn-outline-success btn-lg text-center"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
