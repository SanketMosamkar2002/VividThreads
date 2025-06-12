import fs from "fs";
import path from "path";

//^^^ Get all json object
export const fetchProducts = async (req, res) => {
  try {
    await fs.readFile(
      path.resolve(
        "../backend",
        "products.json"
      ),
      (err, data) => {
        if (err) {
          console.error("Error reading data:", err);
          res.status(500).send("Error reading data");
          return;
        }
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Could not get api" });
  }
};
