import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { Logout } from "../reducers/reduxSlices";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();

  // const { setIsLoggedIn, setLoginName } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocus, setEmailFocus] = useState(null)
  const [isPasswordFocus, setPasswordFocus] = useState(null)
  const dispatch = useDispatch()



  const setToken = (token, expirationTime) => {
    localStorage.setItem('authToken', token)
    localStorage.setItem('authTokenExpiration', expirationTime)
  }

  const checkTokenExpiration = () => {
    const token = localStorage.getItem('authToken');
    const expiration = localStorage.getItem('authTokenExpiration');
    if (token && expiration) {
      const now = new Date().getTime();
      const expirationDate = new Date(expiration);
      const currentDate = new Date(now);
      console.log("Expiration Time: "+expirationDate.toString());
      console.log("current Time: "+currentDate.toString());
      if (now > expiration) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authTokenExpiration');
      }
    }
  }

  useEffect(() => {
    checkTokenExpiration();
  }, []);


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4001/api/v4/login",
        {
          email, password
        }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }
      )
      const { token, expirationTime, userData } = response.data
      setToken(token, expirationTime);

      if (userData && token) {
        toast.success("Login Successfully", {
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/");
          dispatch(Logout(true))
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error("Invalid email ID or password");
      } else {
        toast.error("An error occurred during login");
      }
    }
  }
  return (
    <div className="loginContainer">
      <div className="loginSubContainer">
        <div className="loginHeading">
          <h2>LOGIN</h2>
        </div>
        <form onSubmit={handleLoginSubmit}>
          <div className="loginField">
            <label htmlFor="loginEmail">Enter Email ID</label>
            <input type="email" name="email" id="loginEmail" className={isEmailFocus && "fieldFocused"} value={email} onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="loginField">
            <label htmlFor="loginPassword">Enter Password</label>
            <input type="password" name="password" id="loginPassword" value={password} className={isPasswordFocus && "fieldFocused"} onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="loginBtnDiv">
            <input type="submit" value="LOGIN" className="loginBtn" />
          </div>
          <div className="formFooter">
            <p>Don't have an account? <Link to="/signup">Register</Link></p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
