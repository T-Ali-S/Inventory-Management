import React from "react";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const navigate = useNavigate();

  // Array of products with local image paths
  const products = [
    {
      id: 1,
      name: "Channels",
      image: "/images/Channels.jpg", // Path relative to the `public` folder
      route: "/Category",
    },
    {
      id: 2,
      name: "Angle Bar",
      image: "/images/AngleBar.jpg",
      route: "/Cate_IronBar",
    },
    {
      id: 3,
      name: "Pipes",
      image: "/images/Pipes.jpg",
      route: "/Cate_pipes",
    },
    {
      id: 4,
      name: "Angle Iron",
      image: "/images/AngleIron.jpg",
      route: "/Cate_AngleIron",
    },
  ];

  // Handle click to navigate to the respective route
  const handleImageClick = (route) => {
    if (props.isSellpage === true) {
      navigate(route, { state: { showSelectOption: true } });
    } else {
      navigate(route);
    }
  };

  return (
    <div
      style={{
        marginTop: "65px",
        marginBottom: "75px",
        marginLeft: "30px",
        marginRight: "30px",
      }}
    >
      <div className="h2 text-center m-5">Available Products</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // Two images per row
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {products.map((product) => (
          <div key={product.id} style={{ textAlign: "center" }}>
            <div
              onClick={() => handleImageClick(product.route)}
              style={{
                backgroundImage: `url(${product.image})`, // Use local image
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "600px",
                height: "250px",
                cursor: "pointer",
                border: "1px solid #ddd",
                borderRadius: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              title={product.name}
            ></div>
            <div
              style={{
                marginTop: "10px",
                fontWeight: "bold",
                fontSize: "18px",
                color: "#333",
              }}
            >
              {product.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
