import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Spinner from "../components/Spinner";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { AddToCart, Quantity, RemoveFromCart } from "../reducers/reduxSlices";

let Cart = () => {
  let { myCart, myQuantity } = useSelector((state) => state.myStore);
  let [loading, setLoading] = useState(true);
  let navigate = useNavigate()
  let cartDispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  let heading = "";
  if (myCart.length > 0) {
    let noun = myCart.length > 1 ? "Items" : "Item";
    heading = myCart.length + " " + noun;
  }
  let amount = 0;
  let totalAmount = 0;
  console.log(myCart.length);

  let handleCartDelete = (id) => {
    cartDispatch(RemoveFromCart(id));
    let storedCart = JSON.parse(localStorage.getItem("cart"));
    let indexToRemove = storedCart.findIndex((item) => item.id === id);
    // console.log(indexToRemove);
    if (indexToRemove !== -1) {
      storedCart.splice(indexToRemove, 1);
      // setCart(storedCart);
      localStorage.setItem("cart", JSON.stringify(storedCart));
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {myCart.length > 0 ? (
            <>
              <div className="cartContainer">
                <div className="continueShoppingDiv">
                  {/* <Link to="/ "> */}
                  <FaArrowLeftLong onClick={() => navigate(-1)}></FaArrowLeftLong>
                  <p>Continue Shopping</p>
                  {/* </Link> */}
                </div>
                <div className="cartSubContainer">
                  <div className="leftDiv">
                    <div className="cartItemsSubDiv">
                      <div className="cartText">
                        <h4>Shopping Cart</h4>
                        <p>{heading}</p>
                      </div>
                      <div className="cartItems">
                        {myCart.map((v, i) => {
                          let { images, title, category, price, id } = v;
                          amount = price * myQuantity;
                          totalAmount = amount + totalAmount;
                          return (
                            <div key={i} className="individualCartItemsDiv">
                              <div className="cartImgContainer">
                                <div className="cartImgDiv">
                                  <img src={images[0]} alt={title} />
                                </div>
                              </div>
                              <div className="cartItemsText">
                                <p>{title}</p>
                                <p>
                                  Quantity: <span>{myQuantity}</span>
                                </p>
                                <p>
                                  Category: <span>{category.name}</span>
                                </p>
                                <p>
                                  Price: <span>$ {price}</span>
                                </p>
                              </div>
                              <div className="cartPriceDiv">
                                <p>$ {amount}</p>
                              </div>
                              <div className="cartDeleteDiv">
                                <MdOutlineDeleteOutline
                                  onClick={() => {
                                    handleCartDelete(id);
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="rightDiv">
                    <div className="rightDivSubContainer">
                      <div className="summaryText">
                        <h2>Summary</h2>
                      </div>
                      <div className="summaryQuantity">
                        <p>
                          Items: <span>{myCart.length}</span>
                        </p>
                        <p>$ {totalAmount}</p>
                      </div>
                      <div className="couponDiv">
                        <div className="couponSubDiv">
                          <input
                            type="text"
                            name="coupon"
                            id="coupon"
                            placeholder="COUPON CODE"
                            onClick={(e) => {
                              console.log(e);
                            }}
                          />
                          {/* <p className="invalidCoupon">Coupon is Invalid</p> */}
                        </div>
                        <div className="couponBtnDiv">
                          <button className="couponBtn"> Apply</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1>Cart is Empty</h1>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
