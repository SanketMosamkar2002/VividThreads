import { Router } from "express";
import { fetchProducts } from "../controllers/products.controller.js";

const route = Router();

route.get("/getAllProducts", fetchProducts);

export default route;
