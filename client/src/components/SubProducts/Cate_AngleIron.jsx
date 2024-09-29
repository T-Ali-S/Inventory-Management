import React, { useState, useEffect } from "react";
import { AuthAdmin } from "../authCheck_AC/authCheck";
import { Link, useLocation } from "react-router-dom";
import { FaCartShopping, FaPencil } from "react-icons/fa6";
import { IoIosCheckboxOutline } from "react-icons/io"; // Correct import
import { GrSubtractCircle } from "react-icons/gr";
import axios from "axios";

function Cate_AngleIron(props) {
  const [AngleIrons, setAngleIrons] = useState([]);
  const authCheck = AuthAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const location = useLocation();
  const showSelectOption = location.state?.showSelectOption || false; // Check this state is passed correctly
  const [selectedOption, setSelectedOption] = useState("credit");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedAngleIron, setSelectedAngleIron] = useState({
    _id: "",
    length: "",
    width: "",
    price: "",
  });

  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
  };

  const openModal = (angleIron) => {
    setSelectedAngleIron(angleIron);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAngleIron({
      _id: "",
      length: "",
      width: "",
      price: "",
    });
  };

  const openSelectModal = (AngleIron) => {
    setSelectedAngleIron(AngleIron);
    setIsSelectModalOpen(true);
  };
  const closeSelectModal = () => {
    setIsSelectModalOpen(false);
    setSelectedAngleIron(null);
    setSelectedNumber("");
  };

  const handleSellClick = () => {
    const selectedData =
      JSON.parse(localStorage.getItem("selectedAngleIronData")) || [];
    setSelectedProducts(selectedData);
    setIsSellModalOpen(true);
  };

  const closeSellModal = () => {
    const handleNumberChange = (e) => {
      setSelectedNumber(e.target.value);
    };
    setIsSellModalOpen(false);
    setSelectedProducts([]);
  };

  const handleSelectSubmit = (e) => {
    e.preventDefault();

    if (selectedAngleIron && selectedNumber) {
      let existingData = localStorage.getItem("selectedAngleIronData");
      let AngleIronArray = [];

      try {
        AngleIronArray = existingData ? JSON.parse(existingData) : [];
      } catch (error) {
        console.error("Error parsing localStorage data: ", error);
        AngleIronArray = [];
      }

      if (!Array.isArray(AngleIronArray)) {
        AngleIronArray = [];
      }

      const newSelectedData = {
        ...selectedAngleIron,
        selectedNumber: selectedNumber,
      };

      AngleIronArray.push(newSelectedData);
      localStorage.setItem(
        "selectedAngleIronData",
        JSON.stringify(AngleIronArray)
      );
      closeSelectModal();
    }
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setSelectedAngleIron({ ...selectedAngleIron, [name]: value });
  };

  const fetchAngleIrons = async () => {
    try {
      const response = await fetch("http://localhost:4000/getAngleIron");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setAngleIrons(result);
    } catch (error) {
      console.error("Error while fetching AngleIrons:", error);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const checkResult = await axios.post(
        "http://localhost:4000/checkAngleIron",
        {
          length: selectedAngleIron.length,
          width: selectedAngleIron.width,
          price: selectedAngleIron.price,
        }
      );
      if (checkResult.status === 409) {
        props.showAlert(
          "AngleIron with the same dimensions already exists",
          "warning"
        );
        return;
      }

      const response = await axios.post(
        "http://localhost:4000/editAngleIron",
        selectedAngleIron
      );

      if (response.data.status === "Ok") {
        props.showAlert("AngleIron successfully edited", "success");
        closeModal();
        fetchAngleIrons();
      } else {
        props.showAlert("Unexpected response from the server", "warning");
      }
    } catch (error) {
      console.error("Error while editing product:", error);
      props.showAlert("Error while editing product", "danger");
    }
  };

  const handleConfirmSale = async () => {
    const selectedData =
      JSON.parse(localStorage.getItem("selectedAngleIronData")) || [];

    const salesData = selectedData.map((product) => ({
      name: product.name || "AngleIron",
      length: product.length,
      width: product.width,
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
        localStorage.removeItem("selectedAngleIronData");

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

  const handleNumberChange = (e) => {
    setSelectedNumber(e.target.value);
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
      "selectedAngleIronData",
      JSON.stringify(updatedSelectedProducts)
    );
  };

  useEffect(() => {
    fetchAngleIrons();
  }, []);

  return (
    <>
      <div className="m-5">
        <p className="text-center h1 ">AngleIron</p>
        {AngleIrons.length > 0 ? (
          <table className="table table-hover border text-center">
            <thead>
              <tr className="h4 text-center">
                <th>S.no</th>
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
              {AngleIrons.map((AngleIron, index) => (
                <tr key={AngleIron._id} className="text-center">
                  <td>{index + 1}</td>
                  <td>{AngleIron.length}</td>
                  <td>{AngleIron.width}</td>
                  <td>{AngleIron.price}</td>

                  {authCheck ? (
                    showSelectOption ? (
                      <td>
                        <IoIosCheckboxOutline
                          className="text-success h5"
                          onClick={() => openSelectModal(AngleIron)} // Fix onClick
                        />
                      </td>
                    ) : (
                      <td>
                        <FaPencil
                          className="text-success h5"
                          type="button"
                          onClick={() => openModal(AngleIron)}
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
                to="/AddAngleiron"
                className="btn btn-outline-primary btn-lg text-center"
              >
                Add Category
              </Link>
            )}
          </div>
        )}
      </div>

      {/*Edit Modal */}
      {isModalOpen && (
        <div
          className="modal fade show mt-4"
          onClick={closeModal} // close modal on background click
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
            onClick={(e) => e.stopPropagation()} // prevent modal close when clicking inside
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit AngleIron
                </h5>
              </div>
              <div className="modal-body">
                <form onSubmit={submitForm}>
                  <div className="text-center">
                    <input
                      type="text"
                      name="length"
                      value={selectedAngleIron.length}
                      className="m-3 border-2 p-2"
                      placeholder="Enter AngleIron Length"
                      onChange={inputChangeHandler}
                    />
                    <br />
                    <input
                      type="text"
                      name="width"
                      value={selectedAngleIron.width}
                      className="m-3 border-2 p-2"
                      placeholder="Enter AngleIron Width"
                      onChange={inputChangeHandler}
                    />
                    <br />
                    <input
                      type="text"
                      name="price"
                      value={selectedAngleIron.price}
                      className="m-3 border-2 p-2"
                      placeholder="Enter AngleIron Price"
                      onChange={inputChangeHandler}
                    />
                  </div>
                  <br />
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-success m-1"
                      disabled={
                        !selectedAngleIron.length ||
                        !selectedAngleIron.price ||
                        !selectedAngleIron.width
                      } // Disable button if any field is empty
                    >
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
                            Length: {product.length}, Width: {product.width}, ,
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

export default Cate_AngleIron;
