import React, { useState, useEffect } from "react";
import { AuthAdmin } from "../authCheck_AC/authCheck";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";

function Cate_IronBar() {
  const [AngleBars, setAngleBars] = useState([]);
  const authCheck = AuthAdmin();

  const fetchAngleBars = async () => {
    try {
      const response = await fetch("http://localhost:4000/getAngleBar");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);
      setAngleBars(result);
    } catch (error) {
      console.error("Error while fetching AngleBar:", error);
    }
  };

  useEffect(() => {
    fetchAngleBars();
  }, []);
  return (
    <div className="m-5">
      <p className="text-center h1 ">Angle Bars</p>
      {AngleBars.length > 0 ? (
        <table className="table table-hover border text-center">
          <thead>
            <tr className="h4 text-center">
              {/* <th>Name</th> */}
              <th>S.no</th>
              <th>Shape</th>
              <th>Length</th>
              {authCheck ? "" : <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {AngleBars.map((AngleBar, index) => (
              <tr key={AngleBars._id} className="text-center">
                {/* <td>{AngleBar.name}</td> */}
                <td>{index + 1}</td>
                <td>{AngleBar.shape}</td>
                <td>{AngleBar.length}</td>
                {authCheck ? (
                  ""
                ) : (
                  <td>
                    <FaCartShopping className="text-success h4" />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            fontSize: "1.5rem",
            color: "gray",
          }}
        >
          No Products to review
        </div>
      )}
      {authCheck ? (
        <div class="d-grid gap-2 col-6 mx-auto">
          <Link
            to="/AddAngleBar"
            className="btn btn-outline-primary btn-lg text-center"
          >
            Add Category
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Cate_IronBar;
