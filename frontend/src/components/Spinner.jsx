import React from "react";
import SpinnerGif from "../assets/1486.gif";
const Spinner = () => {
  return (
    <div className="spinner_div">
      <img src={SpinnerGif} alt="...Loading" />
    </div>
  );
};

export default Spinner;
