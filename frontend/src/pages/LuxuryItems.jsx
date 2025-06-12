import React, { useEffect, useState } from "react";
import axios from "axios";
import FeaturedProducts from "../components/FeaturedProducts";
const LuxuryItems = () => {
  let [luxuryItems, setLuxuryItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/v4/getAllProducts");
        setLuxuryItems(response.data.luxuryItems);
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
            {luxuryItems.map((v, i) => {
              return <FeaturedProducts data={v} key={i} />;
            })}
          </>
        }
      </div>
    </div>
  );
};

export default LuxuryItems;
