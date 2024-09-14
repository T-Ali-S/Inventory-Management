import React, { useState, useEffect, useRef } from "react";
import { AuthAdmin } from "../authCheck_AC/authCheck";

function Category() {
  const [channels, setChannels] = useState([]);
  const authCheck = AuthAdmin();

  const fetchChannels = async () => {
    try {
      const response = await fetch("http://localhost:4000/getChannel");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);
      setChannels(result);
    } catch (error) {
      console.error("Error while fetching Channels:", error);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  return (
    <>
      <div className="m-5">
        <p className="text-center h1 ">Channels</p>
        {channels.length > 0 ? (
          <table className="table table-hover border text-center">
            <thead>
              <tr className="h4 text-center">
                {/* <th>Name</th> */}
                <th>S.no</th>
                <th>Length</th>
                <th>Width</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {channels.map((channel, index) => (
                <tr key={channels._id} className="text-center">
                  {/* <td>{channel.name}</td> */}
                  <td>{index + 1}</td>
                  <td>{channel.length}</td>
                  <td>{channel.width}</td>
                  <td>{channel.weight}</td>
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
            <button className="btn btn-outline-primary btn-lg text-center">
              Add Category
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Category;
