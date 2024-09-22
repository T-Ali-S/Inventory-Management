import React, { useState, useEffect } from "react";
import { AuthAdmin } from "../authCheck_AC/authCheck";
import { Link, useLocation } from "react-router-dom";
import { FaCartShopping, FaPencil } from "react-icons/fa6";
import { IoIosCheckboxOutline } from "react-icons/io";
import axios from "axios";

function Category(props) {
  const [channels, setChannels] = useState([]);
  const authCheck = AuthAdmin();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const showSelectOption = location.state?.showSelectOption || false;

  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("credit");

  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
  };

  const openEditModal = (channel) => {
    setSelectedChannel(channel);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedChannel(null);
  };

  const openSelectModal = (channel) => {
    setSelectedChannel(channel);
    setIsSelectModalOpen(true);
  };

  const closeSelectModal = () => {
    setIsSelectModalOpen(false);
    setSelectedChannel(null);
    setSelectedNumber("");
  };

  const handleNumberChange = (e) => {
    setSelectedNumber(e.target.value);
  };

  const handleSelectSubmit = (e) => {
    e.preventDefault();

    if (selectedChannel && selectedNumber) {
      let existingData = localStorage.getItem("selectedChannelData");
      let channelArray = [];

      try {
        channelArray = existingData ? JSON.parse(existingData) : [];
      } catch (error) {
        console.error("Error parsing localStorage data: ", error);
        channelArray = [];
      }

      if (!Array.isArray(channelArray)) {
        channelArray = [];
      }

      const newSelectedData = {
        ...selectedChannel,
        selectedNumber: selectedNumber,
      };

      channelArray.push(newSelectedData);
      localStorage.setItem("selectedChannelData", JSON.stringify(channelArray));
      closeSelectModal();
    }
  };

  const handleSellClick = () => {
    const selectedData =
      JSON.parse(localStorage.getItem("selectedChannelData")) || [];
    setSelectedProducts(selectedData);
    setIsSellModalOpen(true);
  };

  const closeSellModal = () => {
    setIsSellModalOpen(false);
    setSelectedProducts([]);
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setSelectedChannel({ ...selectedChannel, [name]: value });
  };

  const fetchChannels = async () => {
    try {
      const response = await fetch("http://localhost:4000/getChannel");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setChannels(result);
    } catch (error) {
      console.error("Error while fetching Channels:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      // Integrate check and edit logic in one call
      const response = await axios.post("http://localhost:4000/editChannel", {
        _id: selectedChannel._id,
        length: selectedChannel.length,
        width: selectedChannel.width,
        weight: selectedChannel.weight,
        price: selectedChannel.price,
      });

      if (response.status === 409) {
        props.showAlert(
          "Channel with the same dimensions already exists",
          "warning"
        );
      } else if (response.data.status === "Ok") {
        props.showAlert("Channel successfully edited", "success");
        closeEditModal();
        fetchChannels();
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
      JSON.parse(localStorage.getItem("selectedChannelData")) || [];

    const salesData = selectedData.map((product) => ({
      name: product.name || "Channel",
      length: product.length,
      width: product.width,
      weight: product.weight,
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
        localStorage.removeItem("selectedChannelData");

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

  useEffect(() => {
    fetchChannels();
  }, []);

  return (
    <>
      <div className="m-5">
        <p className="text-center h1">Channels</p>
        {loading ? (
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
            Loading...
          </div>
        ) : channels.length > 0 ? (
          <table className="table table-hover border text-center">
            <thead>
              <tr className="h4 text-center">
                <th>S.no</th>
                <th>Length</th>
                <th>Width</th>
                <th>Weight</th>
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
              {channels.map((channel, index) => (
                <tr key={channel._id} className="text-center">
                  <td>{index + 1}</td>
                  <td>{channel.length}</td>
                  <td>{channel.width}</td>
                  <td>{channel.weight}</td>
                  <td>{channel.price}</td>

                  {authCheck ? (
                    showSelectOption ? (
                      <td>
                        <IoIosCheckboxOutline
                          className="text-success h5"
                          type="button"
                          onClick={() => openSelectModal(channel)}
                        />
                      </td>
                    ) : (
                      <td>
                        <FaPencil
                          className="text-success h5"
                          type="button"
                          onClick={() => openEditModal(channel)}
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
                to="/AddChannel"
                className="btn btn-outline-primary btn-lg text-center"
              >
                Add Category
              </Link>
            )}
          </div>
        )}
      </div>

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
                        <li key={index}>
                          Length: {product.length}, Width: {product.width},
                          Weight:
                          {product.weight}, Quantity: {product.selectedNumber},
                          Price: {product.selectedNumber * product.price}
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
                <h5 className="modal-title">Edit Channel</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={submitForm}>
                  <div className="text-center">
                    <input
                      type="text"
                      name="length"
                      value={selectedChannel?.length || ""}
                      className="m-3 border-2 p-2"
                      placeholder="Enter Channel Length"
                      onChange={inputChangeHandler}
                    />
                    <br />
                    <input
                      type="text"
                      name="width"
                      value={selectedChannel?.width || ""}
                      className="m-3 border-2 p-2"
                      placeholder="Enter Channel Width"
                      onChange={inputChangeHandler}
                    />
                    <br />
                    <input
                      type="text"
                      name="weight"
                      value={selectedChannel?.weight || ""}
                      className="m-3 border-2 p-2"
                      placeholder="Enter Channel Weight"
                      onChange={inputChangeHandler}
                    />
                    <br />
                    <input
                      type="text"
                      name="price"
                      value={selectedChannel?.price || ""}
                      className="m-3 border-2 p-2"
                      placeholder="Enter Channel Price"
                      onChange={inputChangeHandler}
                    />
                  </div>
                  <br />
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-success m-1"
                      disabled={
                        !selectedChannel?.length ||
                        !selectedChannel?.width ||
                        !selectedChannel?.price ||
                        !selectedChannel?.weight
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
    </>
  );
}

export default Category;
