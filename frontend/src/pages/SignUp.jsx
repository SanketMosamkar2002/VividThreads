import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Spinner from "../components/Spinner.jsx";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [mobileNo, setMobileNo] = useState("");
  let [isValidEmail, setIsValidEmail] = useState(true);
  let [isValidPassword, setIsValidPassword] = useState(true);
  let [isValidPhone, setIsValidPhone] = useState(true);
  let [isValidName, setIsValidName] = useState(true);
  let [isValidConfirmPswd, setIsValidConfirmPswd] = useState(false);
  let [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  let formData = {
    name,
    email,
    password: confirmPassword,
    mobileNo,
  };

  let handleClick = () => {
    if (
      email.trim() !== "" &&
      isValidEmail &&
      isValidPassword &&
      isValidPhone &&
      password.trim() !== "" &&
      confirmPassword !== "" &&
      // confirmPassword === password &&
      mobileNo.trim() !== ""
    ) {
      axios.post("http://localhost:4001/api/v4/signup", formData).then(
        (d) => {
          console.log("Data saved successfully " + d);
        },
        (e) => console.log(e)
      );

      toast.success("Congratulations Your Account has Successfully Created");
      navigate("/");
    }
    console.log(password);
    console.log(confirmPassword);
    if (password !== confirmPassword) {
      console.log("Password", password, confirmPassword);
      setIsValidConfirmPswd(true);
      // toast.error(
      //   "Password mismatch! Please ensure both fields contain the same password."
      // );
    } else {
      setIsValidConfirmPswd(false);
    }
  };
  return (
    <>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div className="signIn-container">
          <div className="signIn-div">
            <div className="signIn-text">
              <h3>Sign Up</h3>
            </div>
            <div className="signIn-form">
              <input
                type="text"
                name="name"
                id="name"
                // value={name}
                placeholder="Enter your Name"
                onChange={(e) => {
                  const nameRegex =
                    /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
                  setIsValidName(nameRegex.test(e.target.value));
                  if (isValidName) {
                    setName(e.target.value);
                  }
                }}
              />
              {!isValidName && name && (
                <p className="error_warning" style={{ color: "red" }}>
                  Please enter a valid name
                </p>
              )}
              <input
                type="email"
                name="email"
                id="email"
                // value={email}
                placeholder="Enter Email ID*"
                onChange={(e) => {
                  const emailRegex =
                    /^[^\.\s][\w\-]+(\.[\w\-]+)*@([\w-]+\.)+[\w-]{2,}$/gm;
                  setIsValidEmail(emailRegex.test(e.target.value));
                  if (isValidEmail) {
                    setEmail(e.target.value);
                  }
                }}
              />
              {!isValidEmail && email && (
                <p className="error_warning" style={{ color: "red" }}>
                  Please enter a valid email ID
                </p>
              )}
              <input
                type="text"
                name="password"
                id="password"
                placeholder="Enter password*"
                onChange={(e) => {
                  const passwordRegex =
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
                  setIsValidPassword(passwordRegex.test(e.target.value));
                  if (isValidPassword) {
                    console.log(e.target.value);
                    setPassword(e.target.value);
                  } else {
                  }
                }}
              />
              {!isValidPassword && password && (
                <p className="error_warning" style={{ color: "red" }}>
                  1)Must be of more than 8 character. <br />
                  2)Must contain atleast one UpperCase character.
                  <br />
                  3)Must contain atleast one special character.
                  <br />
                  4)Must contain atleast one numeric value.
                  <br />
                </p>
              )}
              <input
                type="text"
                name="confirm_password"
                id="confirm_password"
                // value={confirmPassword}
                placeholder="Confirm password*"
                style={
                  isValidConfirmPswd
                    ? { border: "1px solid red" }
                    : { border: "1px solid black" }
                }
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />

              <input
                type="number"
                name="mobileNo"
                id="mobileNo"
                // value={mobileNo}
                placeholder="Enter mobile number*"
                onChange={(e) => {
                  const mobileRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
                  setIsValidPhone(mobileRegex.test(e.target.value));
                  if (isValidPhone) {
                    setMobileNo(e.target.value);
                  } else {
                  }
                }}
              />
              {!isValidPhone && mobileNo && (
                <p className="error_warning" style={{ color: "red" }}>
                  Please enter a valid 10-digit mobile number.
                </p>
              )}
            </div>
            <div className="signIn-btn">
              <button onClick={handleClick}>Sign In</button>
              <p>
                Already register? <NavLink to="/login">Login</NavLink>
              </p>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default SignUp;
