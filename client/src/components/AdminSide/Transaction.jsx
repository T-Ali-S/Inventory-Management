import { useState, useEffect } from "react";

function Transaction() {
  const [sales, setSales] = useState([]);
  const [filters, setFilters] = useState({
    day: "",
    month: "",
    year: "",
    productName: "",
    paymentType: "",
  });

  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = [2021, 2022, 2023, 2024]; // Adjust as needed
  const productNames = ["Channel", "AngleIron", "AngleBar", "Pipes"];
  const paymentTypes = ["credit", "cash"];

  const fetchSales = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      console.log("Query sent to backend:", query); // Debug the query string
      const response = await fetch(
        `http://localhost:4000/getFilterSales?${query}`
      );
      const result = await response.json();
      console.log("Sales response:", result); // Log backend response
      setSales(result);
    } catch (error) {
      console.error("Error while fetching Sales:", error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Check if each column should be displayed (not entirely empty)
  // const hasWeight = sales.some(
  //   (sale) => sale.weight && sale.weight.trim() !== ""
  // );
  // Check if each column should be displayed (not entirely empty)
  const hasProductName = sales.some(
    (sale) => sale.productName && sale.productName.trim() !== ""
  );
  const hasLength = sales.some(
    (sale) => sale.length && sale.length.toString().trim() !== ""
  );
  const hasWidth = sales.some(
    (sale) => sale.width && sale.width.toString().trim() !== ""
  );
  const hasWeight = sales.some(
    (sale) => sale.weight && sale.weight.toString().trim() !== ""
  );
  const hasShape = sales.some((sale) => sale.shape && sale.shape.trim() !== "");
  const hasGuage = sales.some(
    (sale) => sale.guage && sale.guage.toString().trim() !== ""
  );

  return (
    <>
      <div>
        <div className="text-center h1 mt-5">Sales</div>

        {/* Dropdown Filters */}
        <div className="row my-4">
          <div className="col-md-2">
            <select
              name="day"
              onChange={handleFilterChange}
              className="form-control"
            >
              <option value="">Select Day</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <select
              name="month"
              onChange={handleFilterChange}
              className="form-control"
            >
              <option value="">Select Month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <select
              name="year"
              onChange={handleFilterChange}
              className="form-control"
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <select
              name="productName"
              onChange={handleFilterChange}
              className="form-control"
            >
              <option value="">Select Product</option>
              {productNames.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <select
              name="paymentType"
              onChange={handleFilterChange}
              className="form-control"
            >
              <option value="">Select Payment Type</option>
              {paymentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sales Table */}
        {sales.length > 0 ? (
          <table className="table table-hover border text-center">
            <thead>
              <tr>
                <th>Customer Name</th>
                {hasProductName && <th>Product Name</th>}
                {hasLength && <th>Length</th>}
                {hasWidth && <th>Width</th>}
                {hasWeight && <th>Weight</th>}
                {hasShape && <th>Shape</th>}
                {hasGuage && <th>Guage</th>}
                <th>Date</th>
                <th>Price</th>
                <th>Payment Type</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale._id}>
                  <td>{sale.custName}</td>
                  {hasProductName && <td>{sale.productName || "N/A"}</td>}
                  {hasLength && <td>{sale.length || "N/A"}</td>}
                  {hasWidth && <td>{sale.width || "N/A"}</td>}
                  {hasWeight && <td>{sale.weight || "N/A"}</td>}
                  {hasShape && <td>{sale.shape || "N/A"}</td>}
                  {hasGuage && <td>{sale.guage || "N/A"}</td>}
                  <td>{new Date(sale.date).toLocaleDateString()}</td>
                  <td>{sale.price}</td>
                  <td>{sale.paymentType}</td>
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

export default Transaction;
