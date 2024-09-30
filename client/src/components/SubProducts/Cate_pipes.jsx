import React, { useState, useEffect } from "react";
import { AuthAdmin } from "../authCheck_AC/authCheck";
import { Link, useLocation } from "react-router-dom";
import { FaCartShopping, FaPencil } from "react-icons/fa6";
import { IoIosCheckboxOutline } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";
import axios from "axios";

function Cate_pipes(props) {
  const [Pipes, setPipes] = useState([]);
  const authCheck = AuthAdmin();
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [selectedPipes, setSelectedPipes] = useState(null);
  const location = useLocation();
  const showSelectOption = location.state?.showSelectOption || false;
  const [selectedNumber, setSelectedNumber] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("credit");

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

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setSelectedPipes({ ...selectedPipes, [name]: value });
  };

  const openEditModal = (Pipe) => {
    setSelectedPipes(Pipe); // Use the single Pipe, not Pipes array
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPipes(null);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/editPipes", {
        _id: selectedPipes._id,
        length: selectedPipes.length,
        width: selectedPipes.width,
        guage: selectedPipes.guage,
        price: selectedPipes.price,
      });

      if (response.status === 409) {
        props.showAlert(
          "Pipes with the same dimensions already exists",
          "warning"
        );
      } else if (response.data.status === "Ok") {
        props.showAlert("Pipes successfully edited", "success");
        closeEditModal();
        fetchPipes();
      } else {
        props.showAlert("Unexpected response from the server", "warning");
      }
    } catch (error) {
      console.error("Error while editing product:", error);
      props.showAlert("Error while editing product", "danger");
    }
  };

  const openSelectModal = (Pipe) => {
    setSelectedPipes(Pipe);
    setIsSelectModalOpen(true);
  };
  const closeSelectModal = () => {
    setIsSelectModalOpen(false);
    setSelectedPipes(null);
    setSelectedNumber("");
  };
  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
  };
  const handleNumberChange = (e) => {
    setSelectedNumber(e.target.value);
  };
  const handleSelectSubmit = (e) => {
    e.preventDefault();

    if (selectedPipes && selectedNumber) {
      let existingData = localStorage.getItem("selectedPipesData");
      let pipeArray = [];

      try {
        pipeArray = existingData ? JSON.parse(existingData) : [];
      } catch (error) {
        console.error("Error parsing localStorage data: ", error);
        pipeArray = [];
      }

      if (!Array.isArray(pipeArray)) {
        pipeArray = [];
      }

      const newSelectedData = {
        ...selectedPipes,
        selectedNumber: selectedNumber,
      };

      pipeArray.push(newSelectedData);
      localStorage.setItem("selectedPipesData", JSON.stringify(pipeArray));
      closeSelectModal();
    }
  };

  const handleSellClick = () => {
    const selectedData =
      JSON.parse(localStorage.getItem("selectedPipesData")) || [];
    setSelectedProducts(selectedData);
    setIsSellModalOpen(true);
  };
  const closeSellModal = () => {
    setIsSellModalOpen(false);
    setSelectedProducts([]);
  };
  const handleConfirmSale = async () => {
    const selectedData =
      JSON.parse(localStorage.getItem("selectedPipesData")) || [];

    const salesData = selectedData.map((product) => ({
      productName: "Pipes",
      length: product.length,
      width: product.width,
      guage: product.guage,
      quantity: product.selectedNumber,
      price: product.selectedNumber * product.price, // Total price
      date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
      paymentType: selectedOption, // 'cash' or 'credit'
    }));

    try {
      const response = await axios.post("http://localhost:4000/sales", {
        sales: salesData,
      });

      if (response.status === 200) {
        props.showAlert("Sales successfully recorded", "success");

        // Clear the local storage after successful data submission
        localStorage.removeItem("selectedPipesData");

        // Clear the selected products state and close the sell modal
        setSelectedProducts([]);
        closeSellModal();
      } else {
        props.showAlert("Error recording sales", "danger");
      }
    } catch (error) {
      console.error("Error while recording sales:", error);
      props.showAlert("Error while recording sales", "danger");

      // If error, keep the data in local storage
    }
  };
  const handleDeselectProduct = (productIndex) => {
    // Remove product from selectedProducts array
    const updatedSelectedProducts = selectedProducts.filter(
      (product, index) => index !== productIndex
    );

    // Update state
    setSelectedProducts(updatedSelectedProducts);

    // Update local storage
    localStorage.setItem(
      "selectedPipesData",
      JSON.stringify(updatedSelectedProducts)
    );
  };

  useEffect(() => {
    fetchPipes();
  }, []);

  return (
    <>
      <div className="m-5">
        <p className="text-center h1 ">Pipes</p>
        {Pipes.length > 0 ? (
          <table className="table table-hover border text-center">
            <thead>
              <tr className="text-center h4">
                <th>S.no</th>
                <th>Guage</th>
                <th>Length</th>
                <th>Width</th>
                <th>Price</th>
                {authCheck ? (
                  showSelectOption ? (
                    <th>Select</th>
                  ) : (
                    <th>Edit</th>
                  )
                ) : (
                  <th>Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {Pipes.map((Pipe, index) => (
                <tr key={Pipe._id} className="text-center">
                  <td>{index + 1}</td>
                  <td>{Pipe.guage}</td>
                  <td>{Pipe.length}</td>
                  <td>{Pipe.width}</td>
                  <td>{Pipe.price}</td>
                  {authCheck ? (
                    showSelectOption ? (
                      <td>
                        <IoIosCheckboxOutline
                          className="text-success h5"
                          type="button"
                          onClick={() => openSelectModal(Pipe)}
                        />
                      </td>
                    ) : (
                      <td>
                        <FaPencil
                          className="text-success h5"
                          type="button"
                          onClick={() => openEditModal(Pipe)}
                        />
                      </td>
                    )
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
        {/* Add the two buttons */}
        {authCheck && (
          <div className="d-grid gap-2 col-6 mx-auto">
            {showSelectOption ? (
              <button
                type="button"
                className="btn btn-outline-danger btn-lg text-center"
                onClick={handleSellClick}
              >
                Sell
              </button>
            ) : (
              <Link
                type="button"
                to="/AddPipes"
                className="btn btn-outline-primary btn-lg text-center"
              >
                Add Category
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Modal for Edit */}
      {isEditModalOpen && (
        <div
          className="modal fade show mt-4"
          onClick={closeEditModal}
          style={{
            display: "block",
            position: "fixed",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050,
          }}
        >
          <div
            className="modal-dialog"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Pipes</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={submitForm}>
                  <div className="text-center">
                    <input
                      type="text"
                      name="length"
                      value={selectedPipes?.length || ""}
                      className="m-3 border-2 p-2"
                      placeholder="Enter Pipes Length"
                      onChange={inputChangeHandler}
                    />
                    <br />
                    <input
                      type="text"
                      name="width"
                      value={selectedPipes?.width || ""}
                      className="m-3 border-2 p-2"
                      placeholder="Enter Pipes Width"
                      onChange={inputChangeHandler}
                    />
                    <br />
                    <input
                      type="text"
                      name="guage"
                      value={selectedPipes?.guage || ""}
                      className="m-3 border-2 p-2"
                      placeholder="Enter Pipes Guage"
                      onChange={inputChangeHandler}
                    />
                    <br />
                    <input
                      type="text"
                      name="price"
                      value={selectedPipes?.price || ""}
                      className="m-3 border-2 p-2"
                      placeholder="Enter Pipes Price"
                      onChange={inputChangeHandler}
                    />
                  </div>
                  <br />
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-success m-1"
                      disabled={
                        !selectedPipes?.length ||
                        !selectedPipes?.width ||
                        !selectedPipes?.price ||
                        !selectedPipes?.guage
                      }
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary m-0"
                      onClick={closeEditModal}
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

      {/* Modal for Select/Checkbox */}
      {isSelectModalOpen && (
        <div
          className="modal fade show mt-4"
          onClick={closeSelectModal}
          style={{
            display: "block",
            position: "fixed",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050,
          }}
        >
          <div
            className="modal-dialog"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Quantity</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSelectSubmit}>
                  <div className="text-center">
                    <input
                      type="number"
                      name="quantity"
                      value={selectedNumber}
                      className="m-3 border-2 p-2"
                      placeholder="Enter Quantity"
                      onChange={handleNumberChange}
                      min="1"
                      required
                    />
                  </div>
                  <br />
                  <div className="text-center">
                    <button type="submit" className="btn btn-success m-1">
                      Ok
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary m-0"
                      onClick={closeSelectModal}
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

      {/* Modal for Sell */}
      {isSellModalOpen && (
        <div
          className="modal fade show mt-4"
          onClick={closeSellModal}
          style={{
            display: "block",
            position: "fixed",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050,
          }}
        >
          <div
            className="modal-dialog"
            role="document"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "600px", width: "100%" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Selected Products for Sale</h5>
              </div>
              <div className="modal-body">
                {selectedProducts.length > 0 ? (
                  <>
                    <ul>
                      {selectedProducts.map((product, index) => (
                        <li
                          key={index}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <span>
                            Gauge: {product.guage}, Length: {product.length},
                            Width: {product.width}, Quantity:{" "}
                            {product.selectedNumber}, Price:{" "}
                            {product.selectedNumber * product.price}
                          </span>
                          <GrSubtractCircle
                            type="button"
                            className="h4 "
                            style={{
                              // textAlign: "left",
                              // margin: "auto",
                              marginLeft: "10px",
                              marginTop: "5px",
                              color: "red",
                              // marginBottom: "20px",

                              cursor: "pointer",
                            }} // optional styles for spacing and pointer
                            onClick={() => handleDeselectProduct(index)}
                          />
                        </li>
                      ))}
                    </ul>
                    <div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="check1"
                          name="option1"
                          value="credit"
                          checked={selectedOption === "credit"}
                          onChange={() => handleCheckboxChange("credit")}
                        />
                        <label className="form-check-label" htmlFor="check1">
                          Credit
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="check2"
                          name="option1"
                          value="cash"
                          checked={selectedOption === "cash"}
                          onChange={() => handleCheckboxChange("cash")}
                        />
                        <label className="form-check-label" htmlFor="check2">
                          Cash
                        </label>
                      </div>
                    </div>
                  </>
                ) : (
                  <p>No products selected.</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeSellModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConfirmSale}
                >
                  Confirm Sale
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cate_pipes;
