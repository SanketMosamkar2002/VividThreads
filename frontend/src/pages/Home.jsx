import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import FeaturedProducts from "./../components/FeaturedProducts";
import { NavLink, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
const Home = () => {
  let [electronics, setElectronics] = useState([]);
  let [clothes, setClothes] = useState([]);
  let [furniture, setFurniture] = useState([]);
  let [shoes, setShoes] = useState([]);
  let [luxuryItems, setLuxuryItems] = useState([]);
  let [selected, setSelected] = useState("Clothes");
  let [targetedProduct, setTargetedProduct] = useState("");
  const navigate = useNavigate()

  let clothesSlice = clothes.slice(0, 4);
  let electronicsSlice = electronics.slice(0, 4);
  let furnitureSlice = furniture.slice(0, 4);
  let shoesSlice = shoes.slice(0, 4);
  let luxuryItemsSlice = luxuryItems.slice(0, 4);

  const SelectedProducts = () => {
    if (targetedProduct === "Clothes") {
      return clothesSlice.map((v, i) => {
        return <FeaturedProducts data={v} key={i} />;
      });
    } else if (targetedProduct === "Electronics") {
      return electronicsSlice.map((v, i) => {
        return <FeaturedProducts data={v} key={i} />;
      });
    } else if (targetedProduct === "Furniture") {
      return furnitureSlice.map((v, i) => {
        return <FeaturedProducts data={v} key={i} />;
      });
    } else if (targetedProduct === "Shoes") {
      return shoesSlice.map((v, i) => {
        return <FeaturedProducts data={v} key={i} />;
      });
    } else if (targetedProduct === "Luxury Items") {
      return luxuryItemsSlice.map((v, i) => {
        return <FeaturedProducts data={v} key={i} />;
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/v4/getAllProducts");
        setClothes(response.data.clothes);
        setElectronics(response.data.electronics);
        setFurniture(response.data.furniture);
        setShoes(response.data.shoes);
        setLuxuryItems(response.data.luxuryItems);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleProductClick = (product) => {
    setSelected(product);
  };

  const images = [
    "https://cdn.shopify.com/s/files/1/0861/5021/8013/files/One_Piece.jpg?v=1711396497",
    "https://cdn.shopify.com/s/files/1/0861/5021/8013/files/Tanktop-15.webp?v=1710962153",
    "https://cdn.shopify.com/s/files/1/0861/5021/8013/files/JJK.jpg?v=1711396302",
    "https://cdn.shopify.com/s/files/1/0861/5021/8013/files/Solo_2.jpg?v=1716179485"
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  }

  return (
    <div className="home-div">
      <div className="carouselContainer">
        <div className="carouselSubContainer">
          <Slider {...settings}>
          {images.map((image, i) => {
            return (
              <div className="carouselImgDiv" key={i}>
                <img src={image} alt="index" />
              </div>
            );
          })}
          </Slider>
          {/* <div className="exploreCollection">
            <button className="visitBtn">Explore Collection</button>
          </div> */}
        </div>
      </div>

      <div className="featured_products">
        <p>Featured Products</p>
      </div>
      <div
        className="products_nav"
        onClick={(e) => {
          setTargetedProduct(e.target.innerText);
        }}
      >
        <p
          className={
            selected === "Clothes" ? "selected_product" : "notSelected_product"
          }
          onClick={() => handleProductClick("Clothes")}
        >
          Clothes
        </p>
        <p
          className={
            selected === "Electronics"
              ? "selected_product"
              : "notSelected_product"
          }
          onClick={() => handleProductClick("Electronics")}
        >
          Electronics
        </p>
        <p
          className={
            selected === "Furniture"
              ? "selected_product"
              : "notSelected_product"
          }
          onClick={() => handleProductClick("Furniture")}
        >
          Furniture
        </p>
        <p
          className={
            selected === "Shoes" ? "selected_product" : "notSelected_product"
          }
          onClick={() => handleProductClick("Shoes")}
        >
          Shoes
        </p>
        <p
          className={
            selected === "Luxury Items"
              ? "selected_product"
              : "notSelected_product"
          }
          onClick={() => handleProductClick("Luxury Items")}
        >
          Luxury Items
        </p>{" "}
      </div>
      <div className="clothes_container">
        <div className="clothes_div">
          {targetedProduct === "" ? (
            <>
              {clothesSlice.map((v, i) => {
                return <FeaturedProducts data={v} key={i} />;
              })}
            </>
          ) : (
            <SelectedProducts />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
