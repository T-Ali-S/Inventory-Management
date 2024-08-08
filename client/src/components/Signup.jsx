import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const collectData = async (e) => {
    e.preventDefault();

    const result = await axios.post("http://localhost:4000/check-email", {
      email,
    });
    if (result.data === "Email already exists") {
      props.showAlert("Email already exists", "warning");
      setEmail("");
      setPassword("");
      setName("");
    } else if (result.data === "Email is available") {
      const signUpResponse = await axios.post("http://localhost:4000/signup", {
        name,
        email,
        password,
      });
      if (signUpResponse.data === "Signup successful") {
        props.showAlert("SignUp successful", "success");
        navigate("/Login");
      } else {
        props.showAlert("Unexpected response from server", "warning");
      }
    } else {
      props.showAlert("Unexpected response fromthe server", "warning");
    }
  };

  return (
    <>
      <h2 className="text-center  pt-3 mb-5">Sign-up Form</h2>
      <div className="text-center border-2 m-5">
        <form onSubmit={collectData}>
          <div className="mb-3 mt-5">
            <input
              type="text"
              className="form-label border-2 border-gray-700 p-2"
              value={name}
              placeholder="UserName"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-label border-2 border-gray-700 p-2"
              value={email}
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-label border-2 border-gray-700 p-2"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="mb-4 btn btn-success text-center">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
