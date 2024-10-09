import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminCheck, setAdminCheck] = useState("false");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (pwd) => {
    const hasNumber = /\d/; // regex to check if it contains a number
    const hasAlphabet = /[a-zA-Z]/; // regex to check if it contains an alphabet
    return pwd.length >= 8 && hasNumber.test(pwd) && hasAlphabet.test(pwd);
  };

  const collectData = async (e) => {
    e.preventDefault();

    // Validate password
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain at least one number and one letter"
      );
      return;
    } else {
      setPasswordError("");
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      props.showAlert("Passwords do not match", "warning");
      setConfirmPassword("");
      setPassword("");
      return;
    }

    const result = await axios.post("http://localhost:4000/check-email", {
      email,
    });

    if (result.data === "Email already exists") {
      props.showAlert("Email already exists", "warning");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
    } else if (result.data === "Email is available") {
      const signUpResponse = await axios.post("http://localhost:4000/signup", {
        name,
        email,
        password,
        adminCheck,
      });

      if (signUpResponse.data === "Signup successful") {
        props.showAlert("SignUp successful", "success");
        navigate("/Login");
      } else {
        props.showAlert("Unexpected response from server", "warning");
      }
    } else {
      props.showAlert("Unexpected response from the server", "warning");
    }
  };

  return (
    <>
      <div
        style={{
          textAlign: "center",
          border: "1px solid #e0e0e0",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "400px",
          margin: "200px auto",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <form onSubmit={collectData}>
          <div style={{ marginBottom: "20px", marginTop: "20px" }}>
            <h2
              style={{
                textAlign: "center",
                marginBottom: "30px",
                fontWeight: "bold",
              }}
            >
              Sign-up Form
            </h2>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxSizing: "border-box",
              }}
              value={name}
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="email"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxSizing: "border-box",
              }}
              value={email}
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: "20px", position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxSizing: "border-box",
              }}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* {passwordError && (
            <p style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>
              {passwordError}
            </p>
          )} */}
          <div style={{ marginBottom: "20px", position: "relative" }}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxSizing: "border-box",
              }}
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>
          {passwordError && (
            <p style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>
              {passwordError}
            </p>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
