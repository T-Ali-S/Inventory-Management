import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Adminlogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [adminCheck, setAdminCheck] = useState("true");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/adminlogin", { email, password })
      .then((result) => {
        if (result.data.success) {
          props.showAlert("Logged In", "success");
          // setEmail("");
          // setPassword("");
          props.setIsLoggedIn(true);
          props.setusername(result.data.username);
          localStorage.setItem("username", result.data.username);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("AdminCheck", true);

          navigate("/AdminHome");
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
            <p className="text-2xl font-bold">Admin Login Form</p>
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
            <Link to="/Login">Customer Login</Link>
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

export default Adminlogin;
