import { useState } from "react";
import React from "react";
import axios from "axios";

function Signup(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const collectData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const result = await response.text();

      if (result === "Success") {
        console.log("Email already exist");
      } else {
        console.log("Email is available");
      }
    } catch (error) {
      console.log("Error checking email:", error);
    }
  };

  // const collectData = async (e) => {
  //   e.preventDefault();

  //   let result = await fetch("http://localhost:4000/", {
  //     method: "post",
  //     body: JSON.stringify({ name, email, password }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   result = await result.json;
  //   localStorage.setItem("user", JSON.stringify(result));
  // };

  return (
    <>
      <div className="container">
        <form onSubmit={collectData}>
          <h2 className="text-center pt-3 mb-5">Sign-up Form</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-label border-2 border-gray-700 p-2"
              value={name}
              placeholder="UserName"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-label border-2 border-gray-700 p-2"
              value={email}
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-label border-2 border-gray-700 p-2"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success text-center">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
