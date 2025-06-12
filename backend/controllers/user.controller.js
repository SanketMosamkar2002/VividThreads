import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

//^^^ POST: to send users data to db
export const userSignUp = async (req, res) => {
  try {
    const { name, email, password, mobileNo } = req.body;
    if (!(name && email && password && mobileNo)) {
      res.status(400).json({ message: "Incorrect format field is missing" });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(401).json({ message: "User already exists with this email" });
    }
    const hashPassword = await bcrypt.hashSync(password, 5);
    // const userDetails = new User({
    //   name,
    //   email,
    //   password: hashPassword,
    //   mobileNo,
    // });
    const userDetails = await User.create({
      name,
      email,
      password: hashPassword,
      mobileNo,
    });
    // const token = jwt.sign({ id: User._id, email }, jwtSecrete, {
    //   expiresIn: "2h",
    // });
    res.status(201).json({ userDetails });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error while sending details " + error });
  }
};

//^^^ GET: to fetch users data from db
export const getAllUsers = async (req, res) => {
  try {
    const allUserDetails = await User.find();
    if (!allUserDetails) {
      res.status(400).json({ message: "No records to fetch" });
    }
    res.status(200).json(allUserDetails);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Couldn't able to retrieve data" });
  }
};

//^^^ POST: to get OneUser data from db
export const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({ message: "Send all data" });
    }
    let userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ message: "User doesn't exist" });
    }
    const validPassword = await bcrypt.compare(password, userData.password);
    const jwtSecrete = process.env.JWTSECRETE;
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: userData._id, email }, jwtSecrete, {
      expiresIn: "10m",
    });

    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 10);

    res.cookie("token", token, {
      expires: expirationDate,
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });
    res.status(200).json({
      success: true,
      message: "Login Successful",
      userData,
      token,
      expirationTime: expirationDate.getTime(),
    });
    console.log(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });
    res.status(200).json({ message: "User logout successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Logout failed" });
  }
};

export const authToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const jwtSecrete = process.env.JWTSECRETE;
    jwt.verify(token, jwtSecrete, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      res.status(200).json({ isAuthenticated: true, user: req.user });
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};
