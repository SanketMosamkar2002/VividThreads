import React, { useEffect, useState } from "react";
import axios from "axios";
import CartContext from "../context/CartContext";
import FeaturedProducts from "../components/FeaturedProducts";
const Shoes = () => {
  let [shoes, setShoes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/v4/getAllProducts");
        setShoes(response.data.shoes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="navbarItemsContainer">
      <div className="navbarItemsSubContainer">
        {
          <>
            {shoes.map((v, i) => {
              return <FeaturedProducts data={v} key={i} />;
            })}
          </>
        }
      </div>
    </div>
  );
};

export default Shoes;
