import React, { useCallback, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SingleProduct,FavouriteItem } from "../reducers/reduxSlices";
const FeaturedProducts = ({ data }) => {

  let { price, images, id, title, name, imageUrl } = data || {};
  const dispatch = useDispatch();

  useEffect(() => {
    const persistedState = localStorage.getItem("reduxState");
    if (persistedState) {
      dispatch(SingleProduct(JSON.parse(persistedState)));
    }
  }, [dispatch]);

  const handleClick = () => {
    localStorage.setItem("reduxState", JSON.stringify(data));
    dispatch(SingleProduct(data));
  }

  const handelFavClick=()=>{
    const favStorage=localStorage.getItem("favouriteItem") ||[];
    favStorage.push(data)
    localStorage.setItem("favouriteItem",JSON.stringify(favStorage))
    dispatch(FavouriteItem(data))
  }

  return (

    <div className="product_div" onClick={handleClick}>
      <div className="product_parent">
        <div className="product_img">
          <img src={images ? images[0] : "https://" + imageUrl} alt={title} />
        </div>
        <Link
          to={`/product/${title || name}`}
          style={{ color: "black", textDecoration: "none" }}
        >
          <div className="product_bar">
            <p>Quick View</p>
          </div>
        </Link>

        <div className="product_fav">
          <FaRegHeart className="fpFaHeart" onClick={handelFavClick}/>

        </div>
      </div>
      <div className="product_desc">
        <div className="product_name">
          <p>{title || name}</p>
        </div>
        <div className="product_price">
          <p>$ {price}</p>
        </div>
      </div>
    </div >
  );
};

export default FeaturedProducts;
