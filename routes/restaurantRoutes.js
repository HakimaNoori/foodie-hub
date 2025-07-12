
const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

router.post("/", restaurantController.addRestaurant);
router.get("/", restaurantController.getAllRestaurants);
router.get("/:id", restaurantController.getRestaurantById);
router.put("/:id", restaurantController.updateRestaurant);
router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;
