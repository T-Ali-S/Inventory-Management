import React, { useState, useEffect } from "react";
import { AuthAdmin } from "../authCheck_AC/authCheck";
import { Link } from "react-router-dom";
import { FaCartShopping, FaPencil } from "react-icons/fa6";
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
                {authCheck ? <th>Edit</th> : <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {angleBars.map((angleBar, index) => (
                <tr key={angleBar._id} className="text-center">
                  <td>{index + 1}</td>
                  <td>{angleBar.shape}</td>
                  <td>{angleBar.length}</td>
                  {authCheck ? (
                    <td>
                      <FaPencil
                        className="text-success h5"
                        type="button"
                        onClick={() => openModal(angleBar)}
                      />
                    </td>
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
            <Link
              to="/AddAngleBar"
              className="btn btn-outline-primary btn-lg text-center"
            >
              Add Category
            </Link>
          </div>
        )}
      </div>

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
                  </div>
                  <br />
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-success m-1"
                      disabled={
                        isSubmitting ||
                        !selectedAngleBar.length ||
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
    </>
  );
}

export default IronBarCategory;
