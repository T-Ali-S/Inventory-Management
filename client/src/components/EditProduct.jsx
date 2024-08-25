import React, { useState } from "react";

function EditProduct() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      let response = await fetch("http://localhost:4000/getProduct");
      let result = await response.json();
      setProducts(result);
    } catch (error) {
      console.error("Error While Fetching Products:", error);
    }
  };
  return (
    <>
      <div className="container">
        {products.length > 0 && (
          <table className="table border-2 ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((products, index) => (
                <tr key={index}>
                  <td>{products.name}</td>
                  <td>{products.price}</td>
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
    </>
  );
}

export default EditProduct;
