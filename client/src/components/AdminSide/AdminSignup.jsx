import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminSignup(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminCheck, setAdminCheck] = useState("true");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    const hasNumber = /\d/;
    const hasAlphabet = /[a-zA-Z]/;
    return pwd.length >= 8 && hasNumber.test(pwd) && hasAlphabet.test(pwd);
  };

  const collectData = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain at least one number and one letter"
      );
      return;
    } else {
      setPasswordError("");
    }

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
        //
        navigate("/Login");
        localStorage.removeItem("username");
        localStorage.removeItem("isLoggedIn");
        window.location.reload();
        //
      } else {
        props.showAlert("Unexpected response from server", "warning");
      }
    } else {
      props.showAlert("Unexpected response from the server", "warning");
    }
  };

  return (
    <>
      <div style={styles.container}>
        <form onSubmit={collectData}>
          <div style={styles.inputGroup}>
            <h2 style={styles.heading}>Admin Sign-up Form</h2>
            <input
              type="text"
              style={styles.input}
              value={name}
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <input
              type="email"
              style={styles.input}
              value={email}
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <input
              type={showPassword ? "text" : "password"}
              style={styles.input}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              style={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <div style={styles.inputGroup}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              style={styles.input}
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              style={styles.eyeIcon}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>
          {passwordError && <p style={styles.errorText}>{passwordError}</p>}
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

const styles = {
  container: {
    textAlign: "center",
    border: "1px solid #e0e0e0",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "400px",
    margin: "200px auto",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  heading: {
    marginBottom: "30px",
    fontWeight: "bold",
  },
  inputGroup: {
    marginBottom: "20px",
    position: "relative",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
  },
  eyeIcon: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  errorText: {
    color: "red",
    fontSize: "12px",
    marginBottom: "10px",
  },
};

export default AdminSignup;
