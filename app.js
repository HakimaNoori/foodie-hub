// const express = require("express");
// const menuRoutes = require("./routes/menuRoutes");
// const restaurantRoutes = require("./routes/restaurantRoutes");
// const customerRoutes = require("./routes/customerRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// require("dotenv").config();
// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());
// app.use("/", menuRoutes);
// app.use("/customers", customerRoutes);
// app.use("/orders", orderRoutes);
// app.use("/restaurants", restaurantRoutes);

// app.get("/", (req, res) => {
//   res.send("🎉 Foodie Hub API is running!");
// });

// app.listen(port, () => {
//   console.log(`Server is running on port localhost:${port}`);
// });



const express = require("express");
const menuRoutes = require("./routes/menuRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// ✅ ابتدا این روت تستی رو بذار
app.get("/", (req, res) => {
  res.send("🎉 Foodie Hub API is running!");
});

// ✅ بقیه‌ی روت‌ها با مسیرهای مشخص
app.use("/menus", menuRoutes);
app.use("/customers", customerRoutes);
app.use("/orders", orderRoutes);
app.use("/restaurants", restaurantRoutes);

app.listen(port, () => {
  console.log(`Server is running on port localhost:${port}`);
});


