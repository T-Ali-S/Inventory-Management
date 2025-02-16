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
import AddChannel from "./components/AddSubProducts/AddChannel";
import AddAngleiron from "./components/AddSubProducts/AddAngleiron";
import AddAngleBar from "./components/AddSubProducts/AddAngleBar";
import AddPipes from "./components/AddSubProducts/AddPipes";
import Sell from "./components/AdminSide/Sell";
import Transaction from "./components/AdminSide/Transaction";
import TrackOrder from "./components/common_file/TrackOrder";
import AddInventory from "./components/AddSubProducts/AddInventory";
import ShowInventory from "./components/AddSubProducts/ShowInventory";
import SideMenu from "./components/AdminSide/SideMenu";

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
    }, 3500);
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
          {authCheck ? (
            <>
              <AdminNavbar isLoggedIn={isLoggedIn} username={username} />
              <SideMenu isLoggedIn={isLoggedIn} username={username}>
                <AdminHome showAlert={showAlert} />
              </SideMenu>
            </>
          ) : (
            <>
              <NavBar isLoggedIn={isLoggedIn} username={username} />
              <Alert alert={alert} />
              <Home showAlert={showAlert} />
            </>
          )}
        </>
      ),
    },

    {
      path: "/About",
      element: (
        <>
          <AdminNavbar isLoggedIn={isLoggedIn} username={username} />
          <SideMenu isLoggedIn={isLoggedIn} username={username}>
            <About />
          </SideMenu>
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
          <AdminNavbar isLoggedIn={isLoggedIn} username={username} />
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
          <AdminNavbar />
          <SideMenu isLoggedIn={isLoggedIn} username={username}>
            <Alert alert={alert} />
            <AddProduct showAlert={showAlert} />
          </SideMenu>
        </>
      ),
    },
    {
      path: "/TrackOrder",
      element: (
        <>
          {authCheck ? (
            <>
              <AdminNavbar />
              <SideMenu isLoggedIn={isLoggedIn} username={username}>
                <Alert alert={alert} />
                <TrackOrder
                  showAlert={showAlert}
                  isLoggedIn={isLoggedIn}
                  username={username}
                />
              </SideMenu>
            </>
          ) : (
            <>
              <NavBar isLoggedIn={isLoggedIn} username={username} />
              <Alert alert={alert} />
              <TrackOrder
                showAlert={showAlert}
                isLoggedIn={isLoggedIn}
                username={username}
              />
            </>
          )}
        </>
      ),
    },
    {
      path: "/AddChannel",
      element: (
        <>
          {authCheck ? (
            <>
              <AdminNavbar />
              <SideMenu isLoggedIn={isLoggedIn} username={username}>
                <Alert alert={alert} />
                <AddChannel showAlert={showAlert} />
              </SideMenu>
            </>
          ) : (
            <>
              <NavBar isLoggedIn={isLoggedIn} username={username} />
              <Alert alert={alert} />
              <Category showAlert={showAlert} />
              <Home />
            </>
          )}
          {/* <NavBar isLoggedIn={isLoggedIn} username={username} /> */}
        </>
      ),
    },
    {
      path: "/AddAngleiron",
      element: (
        <>
          <AdminNavbar />
          <SideMenu isLoggedIn={isLoggedIn} username={username}>
            <Alert alert={alert} />
            <AddAngleiron showAlert={showAlert} />
          </SideMenu>
        </>
      ),
    },
    {
      path: "/AddAngleBar",
      element: (
        <>
          <AdminNavbar />
          <SideMenu isLoggedIn={isLoggedIn} username={username}>
            <Alert alert={alert} />
            <AddAngleBar showAlert={showAlert} />
          </SideMenu>
        </>
      ),
    },
    {
      path: "/AddPipes",
      element: (
        <>
          <AdminNavbar />
          <SideMenu isLoggedIn={isLoggedIn} username={username}>
            <Alert alert={alert} />
            <AddPipes showAlert={showAlert} />
          </SideMenu>
        </>
      ),
    },
    {
      path: "/Cate_AngleIron",
      element: (
        <>
          {authCheck ? (
            <>
              <AdminNavbar />
              <SideMenu isLoggedIn={isLoggedIn} username={username}>
                <Alert alert={alert} />
                <Cate_AngleIron
                  showAlert={showAlert}
                  isLoggedIn={isLoggedIn}
                  username={username}
                />
              </SideMenu>
            </>
          ) : (
            <>
              <NavBar isLoggedIn={isLoggedIn} username={username} />
              <Alert alert={alert} />
              <Cate_AngleIron
                showAlert={showAlert}
                isLoggedIn={isLoggedIn}
                username={username}
              />
            </>
          )}
        </>
      ),
    },
    {
      path: "/Category",
      element: (
        <>
          {authCheck ? (
            <>
              <AdminNavbar />
              <SideMenu isLoggedIn={isLoggedIn} username={username}>
                <Alert alert={alert} />
                <Category
                  showAlert={showAlert}
                  isLoggedIn={isLoggedIn}
                  username={username}
                />
              </SideMenu>
            </>
          ) : (
            <>
              <NavBar isLoggedIn={isLoggedIn} username={username} />
              <Alert alert={alert} />
              <Category
                showAlert={showAlert}
                isLoggedIn={isLoggedIn}
                username={username}
              />
            </>
          )}
          {/* <NavBar isLoggedIn={isLoggedIn} username={username} /> */}
        </>
      ),
    },
    {
      path: "/Cate_IronBar",
      element: (
        <>
          {authCheck ? (
            <>
              <AdminNavbar />
              <SideMenu isLoggedIn={isLoggedIn} username={username}>
                <Alert alert={alert} />
                <Cate_IronBar
                  showAlert={showAlert}
                  isLoggedIn={isLoggedIn}
                  username={username}
                />
              </SideMenu>
            </>
          ) : (
            <>
              <NavBar isLoggedIn={isLoggedIn} username={username} />
              <Alert alert={alert} />
              <Cate_IronBar
                showAlert={showAlert}
                isLoggedIn={isLoggedIn}
                username={username}
              />
            </>
          )}
        </>
      ),
    },
    {
      path: "/Cate_pipes",
      element: (
        <>
          {authCheck ? (
            <>
              <AdminNavbar />
              <SideMenu isLoggedIn={isLoggedIn} username={username}>
                <Alert alert={alert} />
                <Cate_pipes
                  showAlert={showAlert}
                  isLoggedIn={isLoggedIn}
                  username={username}
                />
              </SideMenu>
            </>
          ) : (
            <>
              <NavBar isLoggedIn={isLoggedIn} username={username} />
              <Alert alert={alert} />
              <Cate_pipes
                showAlert={showAlert}
                isLoggedIn={isLoggedIn}
                username={username}
              />
            </>
          )}
        </>
      ),
    },
    {
      path: "/EditProduct",
      element: (
        <>
          <AdminNavbar />
          <SideMenu isLoggedIn={isLoggedIn} username={username}>
            <Alert alert={alert} />
            <EditProduct showAlert={showAlert} />
          </SideMenu>
        </>
      ),
    },
    {
      path: "/Sell",
      element: (
        <>
          <AdminNavbar />
          <SideMenu isLoggedIn={isLoggedIn} username={username}>
            <Alert alert={alert} />
            <Sell showAlert={showAlert} />
          </SideMenu>
        </>
      ),
    },
    {
      path: "/Transaction",
      element: (
        <>
          <AdminNavbar />
          <SideMenu isLoggedIn={isLoggedIn} username={username}>
            <Alert alert={alert} />
            <Transaction showAlert={showAlert} />
          </SideMenu>
        </>
      ),
    },
    {
      path: "/AddInventory",
      element: (
        <>
          <AdminNavbar />
          <SideMenu isLoggedIn={isLoggedIn} username={username}>
            <Alert alert={alert} />
            <AddInventory showAlert={showAlert} />
          </SideMenu>
        </>
      ),
    },
    {
      path: "/ShowInventory",
      element: (
        <>
          <AdminNavbar />
          <SideMenu isLoggedIn={isLoggedIn} username={username}>
            <Alert alert={alert} />
            <ShowInventory showAlert={showAlert} />
          </SideMenu>
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
