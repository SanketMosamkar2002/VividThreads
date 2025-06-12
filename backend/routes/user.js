import { Router } from "express";
import {
  userSignUp,
  getAllUsers,
  loginUser,
  logoutUser,
  authToken,
} from "../controllers/user.controller.js";

const route = Router();
route.post("/signup", userSignUp);
route.get("/getAllUsers", getAllUsers);
route.post("/login", loginUser);
route.get("/logout", logoutUser);
route.get("/check-auth", authToken);

export default route;
