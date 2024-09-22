import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Home(props) {
  const [products, setProducts] = useState([]);
  const [channel, setChannel] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/getProduct");
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      console.error("Error while fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRowClick = (index) => {
    if (index === 0) {
      if (props.isSellpage === true) {
        navigate("/Category", {
          state: { showSelectOption: true },
        });
      } else {
        navigate("/Category");
      }
    } else if (index === 1) {
      navigate("/Cate_IronBar");
    } else if (index === 3) {
      navigate("/Cate_pipes");
    } else if (index === 2) {
      if (props.isSellpage === true) {
        navigate("/Cate_AngleIron", {
          state: { showSelectOption: true },
        });
      } else {
        navigate("/Cate_AngleIron");
      }
    } else {
      navigate("/Login");
    }
  };
  return (
    <>
      <div className="m-5">
        <div className="h2 text-center m-5">Available Products</div>
        {products.length > 0 ? (
          <table className="table table-hover border text-center">
            <thead>
              <tr className="h5 text-center">
                <th>Products</th>
                <th>Types</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {products.map((product, index) => (
                <tr
                  key={product._id}
                  onClick={() => handleRowClick(index)}
                  style={{ cursor: "pointer" }}
                  className=" text-center"
                >
                  <td className="">{product.name}</td>
                  <td>{product.types}</td>
                  <td>
                    <button type="button" className="hover:text-danger ">
                      Detail
                    </button>
                  </td>
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
      </div>
    </>
  );
}

export default Home;
