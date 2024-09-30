import React, { useEffect, useState } from "react";
import { AuthAdmin } from "../authCheck_AC/authCheck";

import axios from "axios";

const TrackOrder = ({ username }) => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authCheck = AuthAdmin();

  useEffect(() => {
    if (authCheck) {
      axios
        .get("http://localhost:4000/getCustOrderInfo")
        .then((response) => {
          if (response.data && Array.isArray(response.data)) {
            setOrderData(response.data);
          } else {
            setOrderData([]); // Set an empty array if the response is not valid
          }
          setLoading(false);
        })
        .catch((error) => {
          setError(error.response?.data?.message || "Failed to fetch orders");
          setLoading(false);
        });
    } else if (username) {
      if (username) {
        axios
          .get(`http://localhost:4000/customerOrders/${username}`)
          .then((response) => {
            if (response.data && Array.isArray(response.data)) {
              setOrderData(response.data);
            } else {
              setOrderData([]); // Set an empty array if the response is not valid
            }
            setLoading(false);
          })
          .catch((error) => {
            setError(error.response?.data?.message || "Failed to fetch orders");
            setLoading(false);
          });
      }
    }
  }, [username]);

  const handleDelete = (orderId) => {
    axios
      .delete(`http://localhost:4000/deleteOrder/${orderId}`)
      .then(() => {
        // Remove the deleted order from the state
        setOrderData(orderData.filter((order) => order._id !== orderId));
      })
      .catch((error) => {
        console.error("Failed to delete order", error);
      });
  };

  if (!username) {
    return (
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          fontSize: "1.5rem",
          color: "gray",
        }}
      >
        Please log in to view your orders.
      </p>
    );
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Add a defensive check to ensure orderData is always an array
  if (!Array.isArray(orderData)) {
    return <p>Invalid data format received.</p>;
  }

  return (
    <div>
      {authCheck ? (
        <h2 className="text-center m-5">Order Information</h2>
      ) : (
        <h2 className="text-center m-5">Your Order Information</h2>
      )}

      {orderData.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orderData.map((order) => (
            <div className="border m-2 ">
              <li key={order._id} className="m-2">
                {authCheck && (
                  <div className="row">
                    {/* <strong className="col">Customer Name:</strong> */}
                    <p className="text-uppercase  text-center col h4">
                      {order.customerName}
                    </p>
                  </div>
                )}

                <p>
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Product Name:</strong> {order.productName}
                </p>
                <p>
                  <strong>Quantity:</strong> {order.quantity} pcs
                </p>
                <p>
                  <strong>Length:</strong> {order.length}
                </p>
                <p>
                  <strong>Width:</strong> {order.width}
                </p>
                <p>
                  <strong>Weight:</strong> {order.weight}
                </p>
                <p>
                  <strong>Mass:</strong> {order.mass}
                </p>
                <p>
                  <strong>Price:</strong> {order.price}
                </p>
                <p>
                  <strong>Cell Number:</strong> {order.cellNumber}
                </p>
                {!authCheck && (
                  <div className="text-center h4 text-success">
                    <strong>We will notify you on your Order Shortly</strong>
                  </div>
                )}
                {authCheck && (
                  <div className="text-center mt-3">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(order._id)}
                    >
                      Delete Order
                    </button>
                  </div>
                )}
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrackOrder;
