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
            <p className="text-2xl font-bold">Login Form</p>
          </div>
          <div className="mt-5">
            <input
              type="email" // Changed to "email" for better validation
              value={email}
              placeholder="Enter Email Address"
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-gray-700 p-2"
              required
            />
          </div>
          <div className="mt-2">
            <input
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-gray-700 p-2"
              required
            />
          </div>
          <div className="mt-3">
            <Link to="/Signup">Create an Account</Link>
          </div>
          <div className="mt-3">
            <Link to="/Adminlogin">Admin Login</Link>
          </div>
          <br />
          <button
            type="submit" // Ensure the button submits the form
            className="mb-3  ml-2 bg-green-600 border-2 hover:bg-green-700 text-black p-2"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
