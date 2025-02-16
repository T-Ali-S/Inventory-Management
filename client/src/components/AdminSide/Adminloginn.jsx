import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Adminlogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/adminlogin", { email, password })
      .then((result) => {
        if (result.data.success) {
          props.showAlert("Logged In", "success");
          props.setIsLoggedIn(true);
          props.setusername(result.data.username);
          localStorage.setItem("username", result.data.username);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("AdminCheck", JSON.stringify(true));

          navigate("/");
        } else {
          props.showAlert("Login Failed: " + result.data.message, "warning");
        }
      })
      .catch((err) => console.log(err));
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState); // Toggle password visibility
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <div
          style={{
            border: "1px solid #ddd",
            padding: "30px",
            borderRadius: "15px",
            maxWidth: "400px",
            margin: "200px auto",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{ margin: "20px 0", fontWeight: "bold", color: "#4b4b4b" }}
          >
            Admin Login
          </h2>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="email"
              value={email}
              placeholder="Enter Email Address"
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxSizing: "border-box",
                // textAlign: "center",
                fontSize: "16px",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "20px", position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxSizing: "border-box",
                // textAlign: "center",
                fontSize: "16px",
              }}
              required
            />
            <span
              onClick={toggleShowPassword}
              style={{
                position: "absolute",
                right: "10px",
                top: "12px",
                cursor: "pointer",
                fontSize: "20px",
                color: "#ccc",
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Link
              to="/Login"
              style={{
                textDecoration: "none",
                color: "#6a11cb",
                fontSize: "14px",
              }}
            >
              Customer Login
            </Link>
          </div>

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
        </div>
      </form>
    </>
  );
}

export default Adminlogin;
