import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import user from "./routes/user.js";
import products from "./routes/products.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
const url =
  "mongodb+srv://sanketmosamkar573:Sanket1234@cluster0.haq8cus.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0";
dotenv.config();
mongoose
  .connect(url)
  .then((d) => {
    console.log("Database connected successfully");
  })
  .catch((e) => {
    console.log('Error:',e);
  });
const port = process.env.PORT || 4002;
app.use("/api/v4", products);
app.use("/api/v4", user);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
