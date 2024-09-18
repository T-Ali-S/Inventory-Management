import React, { useState, useEffect } from "react";
import { AuthAdmin } from "../authCheck_AC/authCheck";
import { Link } from "react-router-dom";
import { FaCartShopping, FaPencil } from "react-icons/fa6";
import axios from "axios";

function Cate_AngleIron(props) {
  const [AngleIrons, setAngleIrons] = useState([]);
  const authCheck = AuthAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedAngleIron, setSelectedAngleIron] = useState({
    _id: "",
    length: "",
    width: "",
  });

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
    });
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
      console.log(result);
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

  useEffect(() => {
    fetchAngleIrons();
  }, []);
  return (
    <>
      <div className="m-5">
        <p className="text-center h1 ">Angle Iron</p>
        {AngleIrons.length > 0 ? (
          <table className="table table-hover border text-center">
            <thead>
              <tr className="h4 text-center">
                {/* <th>Name</th> */}
                {/* <th>S.no</th> */}
                <th>S.no</th>
                <th>Length</th>
                <th>Width</th>
                {authCheck ? <th>Edit</th> : <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {AngleIrons.map((AngleIron, index) => (
                <tr key={AngleIrons._id} className="text-center">
                  <td>{index + 1}</td>
                  {/* <td>{AngleIron.name}</td> */}
                  <td>{AngleIron.length}</td>
                  <td>{AngleIron.width}</td>
                  {authCheck ? (
                    <td>
                      <FaPencil
                        className="text-success h5"
                        type="button"
                        onClick={() => openModal(AngleIron)}
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
        {authCheck ? (
          <div class="d-grid gap-2 col-6 mx-auto">
            <Link
              to="/AddAngleiron"
              className="btn btn-outline-primary btn-lg text-center"
            >
              Add Category
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
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
                  </div>
                  <br />
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-success m-1"
                      disabled={
                        !selectedAngleIron.length || !selectedAngleIron.width
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
    </>
  );
}

export default Cate_AngleIron;
