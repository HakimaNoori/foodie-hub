const db = require("../db");

exports.placeOrder = async (req, res) => {
  const { customer_id, restaurant_id, items } = req.body;
  try {
    const orderResult = await db.query(
      "INSERT INTO orders (customer_id, restaurant_id, status) VALUES ($1, $2, $3) RETURNING *",
      [customer_id, restaurant_id, "pending"]
    );

    const orderId = orderResult.rows[0].id;

    for (const item of items) {
      await db.query(
        "INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES ($1, $2, $3)",
        [orderId, item.menu_item_id, item.quantity]
      );
    }

    res.status(201).json({ message: "Order placed", order_id: orderId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM orders");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrdersByCustomer = async (req, res) => {
  const { customerId } = req.params;
  try {
    const result = await db.query(
      "SELECT * FROM orders WHERE customer_id = $1",
      [customerId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await db.query(
      "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM orders WHERE id = $1", [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
