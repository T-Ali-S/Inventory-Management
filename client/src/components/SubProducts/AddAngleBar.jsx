import React, { useState } from "react";
import axios from "axios";

function AddAngleBar(props) {
  // Make sure to pass props here
  const [product_id, setProduct_id] = useState("66dd9bd5e06600a232ed13c9");
  const [shape, setShape] = useState("");
  const [length, setLength] = useState("");

  const collectData = async (e) => {
    e.preventDefault();

    try {
      // Check if the AngleBar with the same dimensions already exists
      const result = await axios.post("http://localhost:4000/checkAngleBar", {
        shape,
        length,
      });

      // If the request is successful (200), proceed to add the new AngleBar
      if (result.status === 200) {
        const AngleBarResponse = await axios.post(
          "http://localhost:4000/addAngleBar",
          {
            product_id, // Added product_id here, if necessary
            shape,
            length,
          }
        );

        if (AngleBarResponse.status === 201) {
          props.showAlert(
            "New Sub-Category for AngleBar Saved succesfully",
            "success"
          );
          // Clear form fields after successful submission
          setShape("");
          setLength("");
        } else {
          props.showAlert("Unexpected response from server", "warning");
        }
      }
    } catch (error) {
      // Handle 409 conflict error and any other errors
      if (error.response && error.response.status === 409) {
        props.showAlert(
          "AngleBar with the same dimensions already exists",
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
        <p className="h3 m-3">Add AngleBar</p>
        <form onSubmit={collectData} className="">
          <div className="mb-3 mt-5">
            <input
              type="text"
              className="form-label border-2 border-gray-700 p-2"
              value={shape}
              placeholder="Enter Shape"
              onChange={(e) => setShape(e.target.value)}
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

export default AddAngleBar;
