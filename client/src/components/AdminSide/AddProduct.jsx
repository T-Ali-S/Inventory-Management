import React, { useState } from "react";
import axios from "axios";

function AddProduct(props) {
  const [name, setName] = useState("");
  const [types, settypes] = useState("");

  const collectData = async (e) => {
    e.preventDefault();

    const result = await axios.post("http://localhost:4000/check-product", {
      name,
      types,
    });
    if (result.data === "Product name already exists") {
      props.showAlert("Product name already exists", "warning");
    } else if (result.data === "Product name is available") {
      const ProductResponse = await axios.post(
        "http://localhost:4000/add-product",
        {
          name,
          types,
        }
      );
      if (ProductResponse.data === "Product successful Added") {
        props.showAlert("Product successful Added", "success");
        setName(""), settypes("");
      } else {
        props.showAlert("Unexpected response from server", "warning");
      }
    } else {
      props.showAlert("Unexpected response from the server", "warning");
    }
  };

  return (
    <>
      <div className=" text-center border-2 m-5">
        <p className="h2 m-3">Add Products</p>
        <form onSubmit={collectData}>
          <div className="mb-3 mt-5">
            <input
              type="text"
              className="form-label border-2 border-gray-700 p-2"
              value={name}
              placeholder="Enter Product Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="number"
              className="form-label border-2 m-1 border-gray-700 p-2"
              value={types}
              placeholder="Enter types"
              onChange={(e) => settypes(e.target.value)}
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

export default AddProduct;
