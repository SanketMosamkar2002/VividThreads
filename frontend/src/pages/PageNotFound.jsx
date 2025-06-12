import React from "react";
// import error from "../assets/images/Error.gif";
import error from './../assets/images/PageNotFound.gif';

const PageNotFound = () => {
  let ErrorStyling = {
    textAlign:"center",
    marginLeft:"20%",
    backgroundColor:"#f0f0f0",
    paddingTop:"50px",
  };
  return (
    <div className="errorContainer">
      <div className="errorSubDiv">
      <img src={error} alt="404 Page Not Found " />
      </div>
    </div>
  );
};

export default PageNotFound;
