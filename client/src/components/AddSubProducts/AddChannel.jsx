import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, Link } from "react-router-dom";

function AddChannel(props) {
  const [product_id, setProduct_id] = useState("66dd9bd5e06600a232ed13c8");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [weight, setWeight] = useState("");
  const [mass, setMass] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const collectData = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post("http://localhost:4000/checkChannel", {
        length,
        width,
        weight,
        mass,
        price,
      });

      // If no conflict, proceed to save the new channel
      if (result.status === 200) {
        const ChannelResponse = await axios.post(
          "http://localhost:4000/addChannel",
          {
            product_id,
            length,
            width,
            weight,
            mass,
            price,
          }
        );
        if (
          ChannelResponse.data ===
          "New Sub-Category for Channel Saved succesfully"
        ) {
          props.showAlert(
            "New Sub-Category for Channel Saved succesfully",
            "success"
          );
          setLength("");
          setWeight("");
          setWidth("");
          setMass("");
          setPrice("");
        } else {
          props.showAlert("Unexpected response from server", "warning");
        }
      }
    } catch (error) {
      // Handle 409 conflict error and other errors
      if (error.response && error.response.status === 409) {
        props.showAlert(
          "Channel with the same dimensions already exists",
          "warning"
        );
      } else {
        props.showAlert("Unexpected error occurred", "danger");
      }
    }
  };

  return (
    <>
      <div className=" text-center border-2 mt-5">
        <div className="d-flex justify-content-center">
          <div className="row text-center">
            <div className="col-auto text-primary">
              <Link to="/Category">
                <IoIosArrowBack className="h4 mt-1" type="button" />
              </Link>
            </div>
            <div className="h3 col-auto">Add Channel</div> {/* Removed me-5 */}
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
            <br />
            <input
              type="text"
              className="form-label border-2 m-1 border-gray-700 p-2"
              value={weight}
              placeholder="Enter weight"
              onChange={(e) => setWeight(e.target.value)}
              required
            />
            <br />
            <input
              type="text"
              className="form-label border-2 m-1 border-gray-700 p-2"
              value={mass}
              placeholder="Enter Mass"
              onChange={(e) => setMass(e.target.value)}
              required
            />
            <br />
            <input
              type="text"
              className="form-label border-2 m-1 border-gray-700 p-2"
              value={price}
              placeholder="Enter price"
              onChange={(e) => setPrice(e.target.value)}
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

export default AddChannel;
