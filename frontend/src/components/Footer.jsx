import React from "react";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-container">
          <div className="online-shopping">
            <p className="shopping-text">
              <NavLink to="/" >ONLINE SHOPPING</NavLink></p>
            <p><NavLink to="/products/clothes">Clothes</NavLink></p>
            <p><NavLink to="/products/shoes">Shoes</NavLink></p>
            <p><NavLink to="/products/luxury">Luxury Items</NavLink></p>
            <p><NavLink to="/products/furniture">Furniture</NavLink></p>
            <p><NavLink to="/products/electronics">Electronics</NavLink></p>
          </div>
          <div className="customer-policies">
            <p className="customer-text">CUSTOMER POLICIES</p>
            <p>Clothes</p>
            <p>Shoes</p>
            <p>Luxury Items</p>
            <p>Furniture</p>
            <p>Electronics</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
