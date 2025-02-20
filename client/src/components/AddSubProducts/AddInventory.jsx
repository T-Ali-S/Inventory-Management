import React, { useState } from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, Link } from "react-router-dom";

function Inventory(props) {
  const [inventory, setInventory] = useState({ mass: "" }); // State to hold inventory data

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      // Send new inventory data
      const response = await axios.post("http://localhost:4000/AddInventory", {
        mass: inventory.mass,
        operation: "new_entry", // Specify new entry operation
      });

      if (response.data.status === "Ok") {
        props.showAlert("Inventory successfully updated", "success");
      } else {
        props.showAlert("Unexpected response from the server", "warning");
      }
    } catch (error) {
      console.error("Error while updating inventory:", error);
      props.showAlert("Error while updating inventory", "danger");
    }
  };

  return (
    <>
      <div className=" text-center border-2 mt-5">
        <div className="d-flex justify-content-center">
          <div className="row text-center">
            <div className="col-auto text-primary">
              <Link to="/ShowInventory">
                <IoIosArrowBack className="h4 mt-1" type="button" />
              </Link>
            </div>
            <div className="h2 col-auto">Add Inventory</div>
          </div>
        </div>
        <form onSubmit={submitForm}>
          <div className="mb-3 mt-5">
            <input
              type="text"
              className="form-label border-2 border-gray-700 p-2"
              value={inventory.mass}
              placeholder="Enter Inventory"
              onChange={(e) => setInventory({ mass: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="mb-4 btn btn-success text-center">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Inventory;
