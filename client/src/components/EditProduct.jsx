import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

function EditProduct(props) {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    _id: "",
    name: "",
    price: "",
  });

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/getProduct");
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      console.error("Error while fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/deleteProducts",
        { id }
      );
      if (response.data.status === "Ok") {
        props.showAlert("Product Deleted", "success");
        setProducts(products.filter((product) => product._id !== id));
      } else {
        props.showAlert("Error while deleting product", "danger");
      }
    } catch (error) {
      console.error("Error while deleting product:", error);
      props.showAlert("Error while deleting product", "danger");
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct({
      _id: "",
      name: "",
      price: "",
    });
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({ ...selectedProduct, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const checkResult = await axios.post(
        "http://localhost:4000/check-product",
        { name: selectedProduct.name }
      );
      if (checkResult.data === "Product name already exists") {
        props.showAlert("Product name already exists", "warning");
        return;
      }

      const response = await axios.post(
        "http://localhost:4000/editProducts",
        selectedProduct
      );

      if (response.data.status === "Ok") {
        props.showAlert("Product successfully edited", "success");
        closeModal();
        fetchProducts();
      } else {
        props.showAlert("Unexpected response from the server", "warning");
      }
    } catch (error) {
      console.error("Error while editing product:", error);
      props.showAlert("Error while editing product", "danger");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="m-5">
        {products.length > 0 && (
          <table className="table border-2 ">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td className="">
                    <BsFillTrashFill
                      type="button"
                      onClick={() => deleteProduct(product._id)}
                      className="mb-1 text-danger"
                    />
                    <BsFillPencilFill
                      type="button"
                      onClick={() => openModal(product)}
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
          className="modal fade show "
          style={{
            display: "block",
            position: "fixed",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050,
          }}
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
                <form onSubmit={submitForm}>
                  <div className="text-center">
                    <input
                      type="text"
                      name="name"
                      value={selectedProduct.name}
                      className="m-3 border-2 p-2"
                      placeholder="Enter Product Name"
                      onChange={inputChangeHandler}
                    />
                    <br />
                    <input
                      type="text"
                      name="price"
                      value={selectedProduct.price}
                      className="m-3 border-2 p-2"
                      placeholder="Enter Product Price"
                      onChange={inputChangeHandler}
                    />
                  </div>
                  <br />
                  {/* <hr /> */}
                  <div className="text-center">
                    <button type="submit" className="btn btn-success m-1">
                      Apply Changes
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary m-0"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProduct;
