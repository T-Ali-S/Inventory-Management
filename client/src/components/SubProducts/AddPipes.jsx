import React, { useState } from "react";
import axios from "axios";

function AddPipes() {
  // Make sure to pass props here
  const [product_id, setProduct_id] = useState("66dd9bd5e06600a232ed13c9");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [guage, setGuage] = useState("");

  const collectData = async (e) => {
    e.preventDefault();

    try {
      // Check if the Pipes with the same dimensions already exists
      const result = await axios.post("http://localhost:4000/checkPipes", {
        guage,
        width,
        length,
      });

      // If the request is successful (200), proceed to add the new Pipes
      if (result.status === 200) {
        const PipesResponse = await axios.post(
          "http://localhost:4000/addPipes",
          {
            product_id,
            guage, // Added product_id here, if necessary
            length,
            width,
          }
        );

        if (PipesResponse.status === 201) {
          props.showAlert(
            "New Sub-Category for Pipes Saved succesfully",
            "success"
          );
          // Clear form fields after successful submission
          setWidth("");
          setLength("");
        } else {
          props.showAlert("Unexpected response from server", "warning");
        }
      }
    } catch (error) {
      // Handle 409 conflict error and any other errors
      if (error.response && error.response.status === 409) {
        props.showAlert(
          "Pipes with the same dimensions already exists",
          "warning"
        );
      } else {
        props.showAlert("Unexpected error occurred", "danger");
      }
    }
  };

  return (
    <>
      <div className=" text-center border-2 m-5">
        <p className="h3 m-3">Add Pipes</p>
        <form onSubmit={collectData} className="">
          <div className="mb-3 mt-5">
            <input
              type="text"
              className="form-label border-2 border-gray-700 p-2"
              value={guage}
              placeholder="Enter guage"
              onChange={(e) => setGuage(e.target.value)}
              required
            />
            <br />
            <input
              type="text"
              className="form-label border-2 border-gray-700 p-2"
              value={width}
              placeholder="Enter width"
              onChange={(e) => setWidth(e.target.value)}
              required
            />
            <br />
            <input
              type="text"
              className="form-label border-2 m-1 border-gray-700 p-2"
              value={length}
              placeholder="Enter Length"
              onChange={(e) => setLength(e.target.value)}
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

export default AddPipes;
