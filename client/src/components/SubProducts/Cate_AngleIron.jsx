import React, { useState, useEffect } from "react";
import { AuthAdmin } from "../authCheck_AC/authCheck";
import { Link } from "react-router-dom";

function Cate_AngleIron() {
  const [AngleIrons, setAngleIrons] = useState([]);
  const authCheck = AuthAdmin();

  const fetchAngleIrons = async () => {
    try {
      const response = await fetch("http://localhost:4000/getAngleIron");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);
      setAngleIrons(result);
    } catch (error) {
      console.error("Error while fetching AngleIrons:", error);
    }
  };

  useEffect(() => {
    fetchAngleIrons();
  }, []);
  return (
    <>
      <div className="m-5">
        <p className="text-center h1 ">Angle Iron</p>
        {AngleIrons.length > 0 ? (
          <table className="table table-hover border text-center">
            <thead>
              <tr className="h4 text-center">
                {/* <th>Name</th> */}
                {/* <th>S.no</th> */}
                <th>S.no</th>
                <th>Length</th>
                <th>Width</th>
              </tr>
            </thead>
            <tbody>
              {AngleIrons.map((AngleIron, index) => (
                <tr key={AngleIrons._id} className="text-center">
                  <td>{index + 1}</td>
                  {/* <td>{AngleIron.name}</td> */}
                  <td>{AngleIron.length}</td>
                  <td>{AngleIron.width}</td>
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
              to="/AddAngleiron"
              className="btn btn-outline-primary btn-lg text-center"
            >
              Add Category
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Cate_AngleIron;
