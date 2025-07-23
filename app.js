const express = require("express");
const menuRoutes = require("./routes/menuRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🎉 Foodie Hub API is running!");
});
app.use("/menus", menuRoutes);
app.use("/customers", customerRoutes);
app.use("/orders", orderRoutes);
app.use("/restaurants", restaurantRoutes);

app.listen(port, () => {
  console.log(`Server is running on port localhost:${port}`);
});


