import React, { useState } from "react";
import axios from "axios";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

function EditProduct(props) {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const fetchProducts = async () => {
    try {
      let response = await fetch("http://localhost:4000/getProduct");
      let result = await response.json();
      setProducts(result);
    } catch (error) {
      console.error("Error While Fetching Products:", error);
    }
  };
  const deleteProduct = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/deleteProducts",
        {
          id,
        }
      );
      if (response.data.status === "Ok") {
        props.showAlert("Product Deleted", "success");
        setProducts(products.filter((product) => product._id !== id));
      } else {
        props.showAlert("Error While Deletion of Product", "danger");
      }
    } catch (error) {
      console.error("Error While Deleting Product:", error);
      props.showAlert("Error While Deletion of Product", "danger");
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="m-5 ">
        {products.length > 0 && (
          <table className="table border-2 ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((products, index) => (
                <tr key={index}>
                  <td>{products.name}</td>
                  <td>{products.price}</td>
                  <td className="">
                    <BsFillTrashFill
                      type="button"
                      onClick={() => deleteProduct(products._id)}
                      className="mb-1 text-danger"
                    />
                    <BsFillPencilFill
                      type="button"
                      onClick={() => openModal(products)}
                      className="mt-1 text-success"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="text-center">
        <button onClick={fetchProducts} className="btn btn-success">
          Show Products
        </button>
      </div>
      {isModalOpen && (
        <div
          className="modal fade show text-center"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Product
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* You can put your form here to edit the selected product */}
                <input
                  type="text"
                  value={name}
                  className="m-3 border-2 p-2"
                  placeholder="Enter Product Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <br />
                <input
                  type="text"
                  value={price}
                  className="m-3 border-2 p-2"
                  placeholder="Enter Product Price"
                  onChange={(e) => setPrice(e.target.value)}
                />
                {/* Add form fields to edit the product */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button type="button" className="btn btn-success">
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProduct;
