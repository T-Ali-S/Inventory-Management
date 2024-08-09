import React from "react";
import { useNavigate, Link } from "react-router-dom";

function AdminHome() {
  return (
    <>
      <div className="text-center mt-5 border-2 m-5">
        <div>Admin dashBoard</div>

        <Link
          className="border-2 
         "
          to="/AdminSignup"
        >
          Create an Admin Account
        </Link>
      </div>
    </>
  );
}

export default AdminHome;
