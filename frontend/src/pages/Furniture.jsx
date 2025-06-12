import React, { useEffect, useState } from "react";
import axios from "axios";
import CartContext from "../context/CartContext";
import { AddToCart } from "../reducers/reduxSlices";
import { useDispatch } from "react-redux";
import FeaturedProducts from "../components/FeaturedProducts";
const Furniture = () => {
  let [furniture, setFurniture] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/v4/getAllProducts");
        setFurniture(response.data.furniture);
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
            {furniture.map((v, i) => {
              return <FeaturedProducts data={v} key={i} />;
            })}
          </>
        }
      </div>
    </div>
  );
};

export default Furniture;
