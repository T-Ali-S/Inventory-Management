import React, { useState, useEffect } from "react";
import { AuthAdmin } from "../authCheck_AC/authCheck";
import { Link, useLocation } from "react-router-dom";
import { FaCartShopping, FaPencil } from "react-icons/fa6";
import { IoIosCheckboxOutline } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";
import axios from "axios";

function IronBarCategory(props) {
  const [angleBars, setAngleBars] = useState([]);
  const authCheck = AuthAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAngleBar, setSelectedAngleBar] = useState({
    _id: "",
    length: "",
    shape: "",
  });
  const location = useLocation();
  const showSelectOption = location.state?.showSelectOption || false;
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("credit");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const openModal = (angleBar) => {
    setSelectedAngleBar(angleBar);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAngleBar({
      _id: "",
      shape: "",
      length: "",
    });
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setSelectedAngleBar({ ...selectedAngleBar, [name]: value });
  };

  const openSelectModal = (angleBar) => {
    setSelectedAngleBar(angleBar);
    setIsSelectModalOpen(true);
  };
  const closeSelectModal = () => {
    setIsSelectModalOpen(false);
    setSelectedAngleBar(null);
    setSelectedNumber("");
  };
  const handleNumberChange = (e) => {
    setSelectedNumber(e.target.value);
  };
  const handleSelectSubmit = (e) => {
    e.preventDefault();

    if (selectedAngleBar && selectedNumber) {
      let existingData = localStorage.getItem("selectedAngleBarData");
      let AngleBarArray = [];

      try {
        AngleBarArray = existingData ? JSON.parse(existingData) : [];
      } catch (error) {
        console.error("Error parsing localStorage data: ", error);
        AngleBarArray = [];
      }

      if (!Array.isArray(AngleBarArray)) {
        AngleBarArray = [];
      }

      const newSelectedData = {
        ...selectedAngleBar,
        selectedNumber: selectedNumber,
      };

      AngleBarArray.push(newSelectedData);
      localStorage.setItem(
        "selectedAngleBarData",
        JSON.stringify(AngleBarArray)
      );
      closeSelectModal();
    }
  };

  const fetchAngleBars = async () => {
    try {
      const response = await fetch("http://localhost:4000/getAngleBar");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setAngleBars(result);
    } catch (error) {
      console.error("Error while fetching AngleBar:", error);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // // Step 1: Check if the new shape and length combination is unique
      // const checkResult = await axios.post(
      //   "http://localhost:4000/checkAngleBar",
      //   {
      //     _id: selectedAngleBar._id,
      //     length: selectedAngleBar.length,
      //     shape: selectedAngleBar.shape,
      //   }
      // );

      // if (checkResult.status === 409) {
      //   // Step 2: If a duplicate row is found, show a warning alert
      //   props.showAlert(
      //     "AngleBar with the same shape and length already exists",
      //     "warning"
      //   );
      //   return;
      // }

      // Step 3: If no duplicate is found, proceed to edit the AngleBar
      const response = await axios.post(
        "http://localhost:4000/editAngleBar",
        selectedAngleBar
      );

      if (response.data.status === "Ok") {
        props.showAlert("AngleBar successfully edited", "success");

        // Update the local state with the edited data
        setAngleBars((prevBars) =>
          prevBars.map((bar) =>
            bar._id === selectedAngleBar._id
              ? { ...bar, ...selectedAngleBar }
              : bar
          )
        );
        closeModal();
      } else {
        props.showAlert("Unexpected response from the server", "warning");
      }
    } catch (error) {
      console.error("Error while editing product:", error);
      props.showAlert("Error while editing product", "danger");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSellClick = () => {
    const selectedData =
      JSON.parse(localStorage.getItem("selectedAngleBarData")) || [];
    setSelectedProducts(selectedData);
    setIsSellModalOpen(true);
  };
  const closeSellModal = () => {
    setIsSellModalOpen(false);
    setSelectedProducts([]);
  };
  const handleConfirmSale = async () => {
    const selectedData =
      JSON.parse(localStorage.getItem("selectedAngleBarData")) || [];

    const salesData = selectedData.map((product) => ({
      name: product.name || "AngleBar",
      length: product.length,
      shape: product.shape,
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
        localStorage.removeItem("selectedAngleBarData");

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
    fetchAngleBars();
  }, []);

  return (
    <>
      <div className="m-5">
        <p className="text-center h1">Angle Bars</p>
        {angleBars.length > 0 ? (
          <table className="table table-hover border text-center">
            <thead>
              <tr className="h4 text-center">
                <th>S.no</th>
                <th>Shape</th>
                <th>Length</th>
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
              {angleBars.map((angleBar, index) => (
                <tr key={angleBar._id} className="text-center">
                  <td>{index + 1}</td>
                  <td>{angleBar.shape}</td>
                  <td>{angleBar.length}</td>
                  <td>{angleBar.price}</td>
                  {authCheck ? (
                    showSelectOption ? (
                      <td>
                        <IoIosCheckboxOutline
                          className="text-success h5"
                          type="button"
                          onClick={() => openSelectModal(angleBar)}
                        />
                      </td>
                    ) : (
                      <td>
                        <FaPencil
                          className="text-success h5"
                          type="button"
                          onClick={() => openModal(angleBar)}
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
                to="/AddAngleBar"
                className="btn btn-outline-primary btn-lg text-center"
              >
                Add Category
              </Link>
            )}
          </div>
        )}
      </div>
      {/*Modal for Edit */}
      {isModalOpen && (
        <div
          className="modal fade show mt-4"
          onClick={closeModal}
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
                <h5 className="modal-title">Edit AngleBar</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={submitForm}>
                  <div className="text-center">
                    <input
                      type="text"
                      name="length"
                      value={selectedAngleBar.length}
                      className="m-3 border-2 p-2"
                      placeholder="Enter AngleBar Length"
                      onChange={inputChangeHandler}
                    />
                    <br />
                    <input
                      type="text"
                      name="shape"
                      value={selectedAngleBar.shape}
                      className="m-3 border-2 p-2"
                      placeholder="Enter AngleBar Shape"
                      onChange={inputChangeHandler}
                    />
                    <br />
                    <input
                      type="text"
                      name="price"
                      value={selectedAngleBar.price}
                      className="m-3 border-2 p-2"
                      placeholder="Enter AngleBar price"
                      onChange={inputChangeHandler}
                    />
                  </div>
                  <br />
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-success m-1"
                      disabled={
                        isSubmitting ||
                        !selectedAngleBar.length ||
                        !selectedAngleBar.price ||
                        !selectedAngleBar.shape
                      }
                    >
                      {isSubmitting ? "Submitting..." : "Apply Changes"}
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
                            Shape: {product.shape}, Length: {product.length}, ,
                            Quantity: {product.selectedNumber}, Price:{" "}
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

export default IronBarCategory;
