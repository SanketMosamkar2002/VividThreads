import React from "react";
import AboutUs from "../pages/AboutUs";
import Products from "../pages/Products";
import Home from "../pages/Home";
import Clothes from "../pages/Clothes";
import Shoes from "../pages/Shoes";
import Furniture from "../pages/Furniture";
import LuxuryItems from "../pages/LuxuryItems";
import Electronics from "../pages/Electronics";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import IndividualProduct from "./IndividualProduct";
import Cart from "../pages/Cart";
import AnimeCollection from "../pages/AnimeCollection";
const Section = () => {
  return (
    <>
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/*" element={<Products />}>
            <Route index element={<Clothes />} />
            <Route path="electronics" element={<Electronics />} />
            <Route path="clothes" element={<Clothes />} />
            <Route path="shoes" element={<Shoes />} />
            <Route path="furniture" element={<Furniture />} />
            <Route path="luxury" element={<LuxuryItems />} />
          </Route>
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:title" element={<IndividualProduct />} />
          <Route path="anime-collection" element={<AnimeCollection />} />
        </Routes>
      </section>
    </>
  );
};

export default Section;
