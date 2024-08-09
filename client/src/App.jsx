import { useState } from "react";
import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
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

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NavBar />
          <Home />
          {/* <Alert alert={alert} /> */}
        </>
      ),
    },
    {
      path: "/About",
      element: (
        <>
          <NavBar />
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
          <Login showAlert={showAlert} />
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
