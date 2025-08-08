import {
  faBagShopping,
  faBars,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
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
          <div className="w-[30%] flex items-center justify-evenly">
            <p>
              <NavLink to="/">
                <Typography variant="subtitle1">Home</Typography>
              </NavLink>
            </p>
            <p className="products">
              <NavLink to="/products"><Typography variant="subtitle1">Products</Typography></NavLink>
              <ul className="products-categories">
                <li>
                  <NavLink to="products/clothes"><Typography variant="subtitle1">Clothes</Typography></NavLink>
                </li>
                <li>
                  <NavLink to="products/shoes"><Typography variant="subtitle1">Shoes</Typography></NavLink>
                </li>
                <li>
                  <NavLink to="products/furniture"><Typography variant="subtitle1">Furniture</Typography></NavLink>
                </li>
                <li>
                  <NavLink to="products/electronics"><Typography variant="subtitle1">Electronics</Typography></NavLink>
                </li>
                <li>
                  <NavLink to="products/luxury"><Typography variant="subtitle1">Luxury Items</Typography></NavLink>
                </li>
              </ul>
            </p>
            <p>
              <NavLink to="/aboutUs"><Typography variant="subtitle1">About us</Typography></NavLink>
            </p>
          </div>
          <div className="flex m-auto items-center justify-evenly ml-[150px]">
            <h2 className="font-700 text-[2.2rem] font-black" style={{ color: "#415161" }}>Vivid</h2>
            <h2 className="font-700 text-[2.2rem] font-black" style={{ color: "#f2295b" }}>Threads</h2>
          </div>
          <div className=" w-[40%] ml-30 flex items-center justify-center gap-x-10">
            <div className="flex gap-x-5 items-center justify-center">
              {
                !isLoggedIn ? (
                  <>
                    <NavLink to="signup">
                      <Button variant="contained" sx={{ backgroundColor: "#f2295b", color: "white" }} >
                        <Typography variant="subtitle1" className="font-bold">SIGN UP</Typography>
                      </Button>
                    </NavLink>
                    <NavLink to="login">
                       <Button variant="outlined" sx={{ color: "#f2295b", borderColor: "#f2295b" }}>
                        <Typography variant="subtitle1" className="font-bold">Login</Typography>
                      </Button>
                    </NavLink>
                  </>
                ) : (
                  <>
                    <button className="credentialBtn" onClick={handleLogout}>LOG OUT</button>
                  </>
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
