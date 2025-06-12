import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaSearch } from "react-icons/fa";
import {
  faHeart,
  faBagShopping,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
const Navbar = () => {

  const { myCart, logout } = useSelector((state) => state.myStore);
  // console.log(logout);
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(logout)
  const navigate = useNavigate()
  // let updatedCart;

  useEffect(() => {
    const updatedCart = JSON.parse(localStorage.getItem("cart"));
    // console.log(updatedCart);
    setCart(updatedCart);
  }, [myCart]);

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (token) {
      setIsLoggedIn(true)
    }
    else {
      setIsLoggedIn(false)
    }
  }, [logout])
  const handleLogout = async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authTokenExpiration");
    console.log("hii");
    const response = await axios.get("http://localhost:4001/api/v4/logout", {
      withCredentials: true,
    })
    console.log(response);
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <header>
        <article>
          <div className="bar-div">
            <FontAwesomeIcon
              className="barIcon"
              icon={faBars}
              style={{ color: "ffff" }}
            />
          </div>
          <div className="navbar-content">
            <p>
              <NavLink to="/">HOME</NavLink>
            </p>
            <p className="products">
              <NavLink to="/products">PRODUCTS</NavLink>
              <ul className="products-categories">
                <li>
                  <NavLink to="products/clothes">Clothes</NavLink>
                </li>
                <li>
                  <NavLink to="products/shoes">Shoes</NavLink>
                </li>
                <li>
                  <NavLink to="products/furniture">Furniture</NavLink>
                </li>
                <li>
                  <NavLink to="products/electronics">Electronics</NavLink>
                </li>
                <li>
                  <NavLink to="products/luxury">LuxuryItems</NavLink>
                </li>
              </ul>
            </p>
            <p>
              <NavLink to="/aboutUs">ABOUT US</NavLink>
            </p>
          </div>
          <div className="logo">
            <h2 style={{ color: "#415161" }}>Vivid</h2>
            <h2 style={{ color: "#f2295b" }}>Threads</h2>
          </div>
          <div className="navbar-icons">
            <div className="searchBar">
              <input type="text" name="navSearch" id="navSearch" placeholder="Search here!" />
              <FaSearch
                style={{ color: "grey", fontSize: "1.1em", cursor: "pointer"}}
              />
            </div>

            <div className="navbarCredentials">
              {
                !isLoggedIn ? (
                  <>
                    <NavLink to="signup">
                      <button className="credentialBtn">SIGN UP</button>
                    </NavLink>
                    <NavLink to="login">
                      <button className="credentialBtn">LOG IN</button>
                    </NavLink>
                  </>
                ) : (
                  // <NavLink to="logout">
                  <>
                    <button className="credentialBtn" onClick={handleLogout}>LOG OUT</button>
                  </>
                  // </NavLink> 
                )
              }
            </div>

            <div className="navbar-sub-icons">
              <div className="test">
                <FontAwesomeIcon
                  className="navIcons"
                  icon={faHeart}
                  style={{ color: "#ec2727" }}
                />
              </div>
            </div>
            <NavLink to={`/cart`}>
              <div className="navbar-sub-icons">
                <div className="test navbarCart">
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    style={{ color: "black" }}
                    className="navIcons cartIcon"
                  />
                  <div className="CartItemsLength">
                    {
                      cart && cart.length > 0 ? <p>{cart.length}</p> : <p>0</p>
                    }
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        </article>
      </header>
    </>
  );
};

export default Navbar;
