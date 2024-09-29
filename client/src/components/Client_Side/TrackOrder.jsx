import React, { useEffect, useState } from "react";
import axios from "axios";

const TrackOrder = ({ username }) => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, [username]);

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
      <h2 className="text-center m-5">Your Orders</h2>
      {orderData.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orderData.map((order) => (
            <div className="border m-2 ">
              <li key={order._id} className="m-2">
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
                <div className="text-center h4 text-success">
                  <strong>We will notify you on your Order Shortly</strong>
                </div>
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrackOrder;
