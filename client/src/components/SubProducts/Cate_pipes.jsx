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
  const [isCartModalOpen, setIsCartModalOpen] = useState(false); // New cart modal state
  const [quantity, setQuantity] = useState("");
  // const [mass, setMass] = useState("");
  const [unit, setUnit] = useState("kg"); // Default unit
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCartViewModalOpen, setIsCartViewModalOpen] = useState(false);
  const [custName, setCustName] = useState("");

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
        mass: selectedPipes.mass,
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
      custName: custName || "Walk In",
      length: product.length,
      width: product.width,
      guage: product.guage,
      mass: product.mass,
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

  //Cart Functionality
  const handleUserVerf = async (Pipe) => {
    if (props.isLoggedIn === true) {
      openCartModal(Pipe);
    } else {
      props.showAlert("Please Log-In to add the product to cart", "warning");
    }
  };
  const openCartModal = (Pipe) => {
    setSelectedPipes(Pipe);
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
    setSelectedPipes(null);
    setQuantity("");
    // setMass("");
  };

  const handleAddToCart = () => {
    if (
      selectedPipes &&
      quantity
      // && mass
    ) {
      const cartData = {
        ...selectedPipes,
        quantity,
        // mass: `${mass} ${unit}`,
      };

      let existingCartData = localStorage.getItem("cartData");
      let cartArray = [];

      try {
        cartArray = existingCartData ? JSON.parse(existingCartData) : [];
      } catch (error) {
        console.error("Error parsing localStorage data: ", error);
        cartArray = [];
      }

      cartArray.push(cartData);
      localStorage.setItem("cartData", JSON.stringify(cartArray));
      closeCartModal();
    }
  };

  const handleSeeCartClick = () => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartData")) || [];
    setCartItems(storedCartItems);
    setShowCartModal(true);
  };

  const closeShowCartModal = () => {
    setShowCartModal(false); // Close the cart modal
    setCartItems([]); // Optionally clear cart items or keep them as needed
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleDeselectCartProduct = (productIndex) => {
    // Remove the selected product from the cart
    const updatedCartItems = cartItems.filter(
      (_, index) => index !== productIndex
    );

    // Update state
    setCartItems(updatedCartItems);

    // Update local storage
    localStorage.setItem("cartData", JSON.stringify(updatedCartItems));
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleConfirmOrder = async () => {
    if (phoneNumber && cartItems.length > 0) {
      const orderDetails = cartItems.map((item) => ({
        productName: "Pipe",
        length: item.length,
        guage: item.guage,
        width: item.width,
        mass: item.mass,
        price: item.price,
        quantity: item.quantity,
        orderDate: new Date().toISOString(),
        customerName: props.username,
        cellNumber: phoneNumber,
      }));

      try {
        const response = await axios.post("http://localhost:4000/Orders", {
          cart: orderDetails,
          // phoneNumber,
          // orderDetails,
        });

        if (response.status === 200) {
          props.showAlert("Order Send to the Admin", "success");
          localStorage.removeItem("cartData"); // Clear cart after confirming
          setShowCartModal(false);
        } else {
          props.showAlert(
            "Error confirming order. Please try again.",
            "warning"
          );
        }
      } catch (error) {
        console.error("Error:", error);
        props.showAlert("Error confirming order. Please try again.", "warning");
      }
    } else {
      props.showAlert(
        "Please enter a phone number and add items to the cart.",
        "warning"
      );
    }
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
                <th>Mass</th>
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
                  <td>{Pipe.mass} KG</td>
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
                      <FaCartShopping
                        className="text-success h4"
                        type="button"
                        onClick={() => handleUserVerf(Pipe)}
                      />
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
        {authCheck ? (
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
        ) : (
          <div className="d-grid gap-2 col-6 mx-auto">
            <Link
              type="button"
              onClick={handleSeeCartClick}
              className="btn btn-outline-success btn-lg text-center"
            >
              See Cart <FaCartShopping className="ms-2" />
            </Link>
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
                    <br />
                    <input
                      type="text"
                      name="mass"
                      value={selectedPipes?.mass || ""}
                      className="m-3 border-2 p-2"
                      placeholder="Enter Pipes mass"
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
                        !selectedPipes?.mass ||
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
            style={{ maxWidth: "700px", width: "100%" }}
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
                            Width: {product.width}, Mass: {product.mass} KG ,
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
                    <hr />
                    <div>
                      <div className="h4 text-center">
                        Choose Payment options
                      </div>
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
                      <hr />
                      <div className="m-2 text-center">
                        <div className="h4 mb-4">Enter Customer Name</div>
                        <input
                          type="text"
                          name="custName"
                          value={custName}
                          required
                          onChange={(e) => setCustName(e.target.value)}
                          className="p-1 rounded-pill text-center"
                          placeholder="Enter Name"
                        />
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

      {/* Modal for Cart */}
      {isCartModalOpen && (
        <div
          className="modal fade show mt-4"
          onClick={closeCartModal}
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
              <div className="modal-header ">
                <h5 className="modal-title">Add to Cart</h5>
              </div>
              <div className="modal-body">
                <div className="text-center">
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="m-3 border-2 p-2"
                    placeholder="Enter Quantity"
                    min="1"
                    required
                  />
                  {/* <input
                    type="number"
                    value={mass}
                    onChange={handleMassChange}
                    className="m-3 border-2 p-2"
                    placeholder={`Weight (${unit})`}
                    min="0"
                    required
                  /> */}
                  <select
                    value={unit}
                    onChange={handleUnitChange}
                    className="m-3 border-2 p-2"
                  >
                    <option value="kg">Kilograms</option>
                    {/* <option value="g">Grams</option> */}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeCartModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart viewing modal */}
      {showCartModal && (
        <div
          className="modal fade show mt-4"
          onClick={closeShowCartModal} // Function to close the modal
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
            onClick={(e) => e.stopPropagation()} // Prevent click on dialog from closing modal
            style={{ maxWidth: "650px", width: "100%" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Your Cart</h5>
              </div>
              <div className="modal-body">
                {cartItems.length > 0 ? ( // Check if there are items in the cart
                  <ul>
                    {cartItems.map((item, index) => (
                      <li
                        key={index}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <span>
                          Length: {item.length}, Guage: {item.guage},width:{" "}
                          {item.width}, Mass: {item.mass * item.quantity} KG,
                          Quantity: {item.quantity}, Price:{" "}
                          {item.price * item.quantity}
                        </span>
                        {/* Deselect icon */}
                        <GrSubtractCircle
                          className="text-danger h4"
                          onClick={() => handleDeselectCartProduct(index)}
                          style={{
                            marginLeft: "10px",
                            marginTop: "5px",
                            color: "red",

                            cursor: "pointer",
                          }}
                        />
                      </li>
                    ))}
                    <div className="text-center mt-5">
                      <input
                        type="text"
                        className="text-center p-1"
                        value={phoneNumber} // Controlled input for phone number
                        onChange={handlePhoneNumberChange} // Update phone number in state
                        placeholder="Enter your phone number"
                        style={{
                          marginTop: "10px",
                          width: "50%",
                        }}
                      />
                    </div>
                  </ul>
                ) : (
                  <p className="h4 text-center">Your cart is empty.</p> // Message when there are no items
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeShowCartModal} // Close button
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConfirmOrder} // Confirm order button
                >
                  Confirm Order
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
