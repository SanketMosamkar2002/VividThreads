import { createSlice } from "@reduxjs/toolkit";
import FeaturedProducts from "./../components/FeaturedProducts";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
const favItemFromLS = localStorage.getItem("favouriteItem") || [];
const qunatityFromLocalStorage = JSON.parse(localStorage.getItem("quantity"));

const initialQuantity = qunatityFromLocalStorage
  ? qunatityFromLocalStorage
  : "";
let initialState = {
  myCart: cartFromLocalStorage,
  mySingleProduct: JSON.parse(localStorage.getItem("reduxState")),
  myQuantity: initialQuantity,
  logout: false,
  favouriteItem: favItemFromLS,
};

export const reducerSlices = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    AddToCart: (state, action) => {
      state.myCart.push(action.payload);
    },
    RemoveFromCart: (state, action) => {
      state.myCart = state.myCart.filter((v) => v.id !== action.payload);
    },
    SingleProduct: (state, action) => {
      state.mySingleProduct = action.payload;
    },
    Quantity: (state, action) => {
      state.myQuantity = action.payload;
    },
    Logout: (state, action) => {
      state.logout = action.payload;
    },
    FavouriteItem: (state, action) => {
      state.favouriteItem = action.payload;
    },
  },
});
export const {
  AddToCart,
  SingleProduct,
  Quantity,
  RemoveFromCart,
  Logout,
  FavouriteItem,
} = reducerSlices.actions;
export default reducerSlices.reducer;
