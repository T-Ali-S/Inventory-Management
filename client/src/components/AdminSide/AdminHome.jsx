import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Home from "../common_file/Home";

function AdminHome() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/getProduct");
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      console.error("Error while fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleRowClick = (index) => {
    if (index === 0) {
      navigate("/Category");
    } else if (index === 1) {
      navigate("/Cate_IronBar");
    } else if (index === 3) {
      navigate("/Cate_pipes");
    } else if (index === 2) {
      navigate("/Cate_AngleIron");
    } else {
      navigate("/Login");
    }
  };
  return (
    <>
      <div className="text-center h1 pt-3 border m-5 ">
        <div>Admin dashBoard</div>

        <Link
          className="border-2 btn btn-outline-primary mb-3"
          type="button"
          to="/AdminSignup"
        >
          Create an Admin Account
        </Link>
      </div>
      <div>
        <Home />
      </div>
    </>
  );
}

export default AdminHome;
