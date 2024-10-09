import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/login", { email, password })
      .then((result) => {
        if (result.data.success) {
          props.showAlert("Logged In", "success");
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
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <div
          style={{
            border: "1px solid #e0e0e0",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "400px",
            margin: "200px auto",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ margin: "20px 0", fontWeight: "bold" }}>Log In</h2>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="email"
              value={email}
              placeholder="me@example.com"
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxSizing: "border-box",
              }}
              required
            />
          </div>

          <div style={{ marginBottom: "20px", position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxSizing: "border-box",
              }}
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

          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <Link
              to="/Signup"
              style={{
                textDecoration: "none",
                color: "#6a11cb",
                marginRight: "20px",
              }}
            >
              Create an Account
            </Link>
            <Link
              to="/Adminlogin"
              style={{ textDecoration: "none", color: "#6a11cb" }}
            >
              Admin Login
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
          <div className="mt-2">
            <Link
              to="/Adminlogin"
              style={{ textDecoration: "none", color: "#6a11cb" }}
            >
              Forgot Password
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
