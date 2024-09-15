import React, { useState, useEffect } from "react";
import { AuthAdmin } from "../authCheck_AC/authCheck";
import { Link } from "react-router-dom";
import { FaCartShopping, FaPencil } from "react-icons/fa6";

function Cate_pipes() {
  const [Pipes, setPipes] = useState([]);
  const authCheck = AuthAdmin();

  const fetchPipes = async () => {
    try {
      const response = await fetch("http://localhost:4000/getPipe");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);
      setPipes(result);
    } catch (error) {
      console.error("Error while fetching Pipes:", error);
    }
  };

  useEffect(() => {
    fetchPipes();
  }, []);
  return (
    <div className="m-5">
      <p className="text-center h1 ">Pipes</p>
      {Pipes.length > 0 ? (
        <table className="table table-hover border text-center">
          <thead>
            <tr className="text-center h4">
              {/* <th>Name</th> */}
              {/* <th>S.no</th> */}
              <th>S.no</th>
              <th>Guage</th>
              <th>Length</th>
              <th>Width</th>
              {authCheck ? <th>Edit</th> : <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {Pipes.map((Pipe, index) => (
              <tr key={Pipes._id} className="text-center">
                {/* <td>{Pipe.name}</td> */}
                <td>{index + 1}</td>
                <td>{Pipe.guage}</td>
                <td>{Pipe.length}</td>
                <td>{Pipe.width}</td>
                {authCheck ? (
                  <td>
                    <FaPencil className="text-success h5" />
                  </td>
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
            to="/AddPipes"
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

export default Cate_pipes;
