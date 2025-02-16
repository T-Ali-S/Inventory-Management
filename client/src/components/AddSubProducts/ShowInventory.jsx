import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { useNavigate, Link } from "react-router-dom";

function ShowInventory() {
  const [inventorys, setInventorys] = useState([]);

  const fetchInventory = async () => {
    try {
      const response = await fetch("http://localhost:4000/getInventory");
      const result = await response.json();
      setInventorys(result);
    } catch (error) {
      console.error("Error while fetching Inventory:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <>
      <div className="m-5">
        <div className="h2 text-center m-5">Available Inventory</div>
        <table className="table border text-center ">
          <thead>
            <tr className="h5 text-center">
              <th>Mass</th>
              <th>Add Inventory</th>
            </tr>
          </thead>
          <tbody className="">
            {inventorys.length > 0 ? (
              inventorys.map((inventory) => (
                <tr key={inventory._id} className="text-center">
                  <td>{inventory.mass} KG</td>
                  <td>
                    <Link to="/AddInventory">
                      <FaPlus className="text-success h5 mt-1" type="button" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td>0 KG</td>
                <td>
                  <Link to="/AddInventory">
                    <FaPlus className="text-success h5 mt-1" type="button" />
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ShowInventory;
