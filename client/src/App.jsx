import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/Login";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Adminlogin from "./components/Adminloginn";
import AdminSignup from "./components/AdminSignup";
import AdminHome from "./components/AdminHome";
import AdminNavbar from "./components/AdminNavbar";

function App() {
  const [alert, setAlert] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setusername] = useState("");

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (storedIsLoggedIn && storedUsername) {
      setIsLoggedIn(true);
      setusername(storedUsername);
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NavBar isLoggedIn={isLoggedIn} username={username} />
          <Home />
          {/* <Alert alert={alert} /> */}
        </>
      ),
    },
    {
      path: "/About",
      element: (
        <>
          <NavBar isLoggedIn={isLoggedIn} username={username} />
          <About />
        </>
      ),
    },
    {
      path: "/Login",
      element: (
        <>
          <NavBar />
          <Alert alert={alert} />
          <Login
            showAlert={showAlert}
            setIsLoggedIn={setIsLoggedIn}
            setusername={setusername}
          />
        </>
      ),
    },
    {
      path: "/Signup",
      element: (
        <>
          <NavBar />
          <Alert alert={alert} />
          <Signup showAlert={showAlert} />
        </>
      ),
    },
    {
      path: "/Adminlogin",
      element: (
        <>
          <NavBar />
          <Alert alert={alert} />
          <Adminlogin showAlert={showAlert} />
        </>
      ),
    },
    {
      path: "/AdminSignup",
      element: (
        <>
          <NavBar />
          <Alert alert={alert} />
          <AdminSignup showAlert={showAlert} />
        </>
      ),
    },
    {
      path: "/AdminHome",
      element: (
        <>
          <AdminNavbar />
          <Alert alert={alert} />
          <AdminHome showAlert={showAlert} />
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
