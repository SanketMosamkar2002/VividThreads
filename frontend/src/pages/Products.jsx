import React from "react";
import Clothes from "./Clothes";
import { NavLink, Routes, Route,Outlet } from "react-router-dom";
// import "../App.css";
const Products = () => {
  return (
    <div className="main-section">
      <Routes>
        <Route to="clothes" element={<Clothes />} />
      </Routes>
      <Outlet/>
    </div>
  );
};

export default Products;
