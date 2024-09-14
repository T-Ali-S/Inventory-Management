import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/Client_Side/NavBar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/AdminSide/About";
import Home from "./components/common_file/Home";
import Login from "./components/Client_Side/Login";
import Alert from "./components/common_file/Alert";
import { AuthAdmin } from "./components/authCheck_AC/authCheck";
import Signup from "./components/Client_Side/Signup";
import Adminlogin from "./components/AdminSide/Adminloginn";
import AdminSignup from "./components/AdminSide/AdminSignup";
import AdminHome from "./components/AdminSide/AdminHome";
import AdminNavbar from "./components/AdminSide/AdminNavbar";
import AddProduct from "./components/AdminSide/AddProduct";
import EditProduct from "./components/AdminSide/EditProduct";
import Category from "./components/SubProducts/Category";
import Cate_AngleIron from "./components/SubProducts/Cate_AngleIron";
import Cate_IronBar from "./components/SubProducts/Cate_IronBar";
import Cate_pipes from "./components/SubProducts/Cate_pipes";

function App() {
  const [alert, setAlert] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setusername] = useState("");
  const authCheck = AuthAdmin();

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
          <AdminNavbar isLoggedIn={isLoggedIn} username={username} />
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
          <Adminlogin
            showAlert={showAlert}
            setIsLoggedIn={setIsLoggedIn}
            setusername={setusername}
          />
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
          <AdminNavbar isLoggedIn={isLoggedIn} username={username} />
          <Alert alert={alert} />
          <AdminHome showAlert={showAlert} />
        </>
      ),
    },
    {
      path: "/AddProduct",
      element: (
        <>
          <AdminNavbar isLoggedIn={isLoggedIn} username={username} />
          <Alert alert={alert} />
          <AddProduct showAlert={showAlert} />
        </>
      ),
    },
    {
      path: "/Category",
      element: (
        <>
          {authCheck ? (
            <AdminNavbar isLoggedIn={isLoggedIn} username={username} />
          ) : (
            <NavBar isLoggedIn={isLoggedIn} username={username} />
          )}
          {/* <NavBar isLoggedIn={isLoggedIn} username={username} /> */}
          <Alert alert={alert} />
          <Category showAlert={showAlert} />
        </>
      ),
    },
    {
      path: "/Cate_AngleIron",
      element: (
        <>
          {authCheck ? (
            <AdminNavbar isLoggedIn={isLoggedIn} username={username} />
          ) : (
            <NavBar isLoggedIn={isLoggedIn} username={username} />
          )}
          <Alert alert={alert} />
          <Cate_AngleIron showAlert={showAlert} />
        </>
      ),
    },
    {
      path: "/Cate_IronBar",
      element: (
        <>
          {authCheck ? (
            <AdminNavbar isLoggedIn={isLoggedIn} username={username} />
          ) : (
            <NavBar isLoggedIn={isLoggedIn} username={username} />
          )}
          <Alert alert={alert} />
          <Cate_IronBar showAlert={showAlert} />
        </>
      ),
    },
    {
      path: "/Cate_pipes",
      element: (
        <>
          {authCheck ? (
            <AdminNavbar isLoggedIn={isLoggedIn} username={username} />
          ) : (
            <NavBar isLoggedIn={isLoggedIn} username={username} />
          )}
          <Alert alert={alert} />
          <Cate_pipes showAlert={showAlert} />
        </>
      ),
    },
    {
      path: "/EditProduct",
      element: (
        <>
          <AdminNavbar isLoggedIn={isLoggedIn} username={username} />
          <Alert alert={alert} />
          <EditProduct showAlert={showAlert} />
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
