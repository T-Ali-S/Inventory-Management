import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, Link } from "react-router-dom";

function AddAngleiron(props) {
  const [product_id, setProduct_id] = useState("66dd9bd5e06600a232ed13ca");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");

  const collectData = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:4000/checkAngleIron", {
      length,
      width,
    });
    if (result.status === 409) {
      props.showAlert(
        "AngleIron with the same dimensions already exists",
        "warning"
      );
    } else if (result.status === 200) {
      const AngleIronResponse = await axios.post(
        "http://localhost:4000/addAngleIron",
        {
          product_id,
          length,
          width,
        }
      );
      if (
        AngleIronResponse.data ===
        "New Sub-Category for AngleIron Saved succesfully"
      ) {
        props.showAlert(
          "New Sub-Category for AngleIron Saved succesfully",
          "success"
        );
        setLength(""), setWidth("");
      } else {
        props.showAlert("Unexpected response from server", "warning");
      }
    } else {
      props.showAlert("Unexpected response from Server", "warning");
    }
  };
  return (
    <>
      <div className=" text-center border-2 mt-5">
        <div className="d-flex justify-content-center">
          <div className="row text-center">
            <div className="col-auto text-primary">
              <Link to="/Cate_AngleIron">
                <IoIosArrowBack className="h4 mt-1" type="button" />
              </Link>
            </div>
            <div className="h2 col-auto">Add AngleIron</div>{" "}
            {/* Removed me-5 */}
          </div>
        </div>
        <form onSubmit={collectData} className="">
          <div className="mb-3 mt-5">
            <input
              type="text"
              className="form-label border-2 border-gray-700 p-2"
              value={length}
              placeholder="Enter Length"
              onChange={(e) => setLength(e.target.value)}
              required
            />
            <br />
            <input
              type="text"
              className="form-label border-2 m-1 border-gray-700 p-2"
              value={width}
              placeholder="Enter Width"
              onChange={(e) => setWidth(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-success btn-lg text-center"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddAngleiron;
