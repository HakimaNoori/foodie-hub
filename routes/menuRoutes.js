const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

router.post("/restaurants/:restaurantId/menu", menuController.addMenuItem);

router.put("/:id", menuController.updateMenuItem);

router.delete("/:id", menuController.deleteMenuItem);

router.get("/restaurants/:restaurantId/menu", menuController.getMenuItems);

router.patch("/:id/availability", menuController.toggleAvailability);

module.exports = router;
