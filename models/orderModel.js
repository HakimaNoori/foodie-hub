const db = require("../db");

exports.create = async ({ customer_id, restaurant_id, items }) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      "INSERT INTO orders (customer_id, restaurant_id, status, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [customer_id, restaurant_id, "pending"]
    );
    const order = result.rows[0];

    for (const item of items) {
      await client.query(
        "INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES ($1, $2, $3)",
        [order.id, item.menu_item_id, item.quantity]
      );
    }

    await client.query("COMMIT");
    return order;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

exports.getAll = async () => {
  const result = await db.query(
    "SELECT * FROM orders ORDER BY created_at DESC"
  );
  return result.rows;
};

exports.getByCustomer = async (customerId) => {
  const result = await db.query("SELECT * FROM orders WHERE customer_id=$1", [
    customerId,
  ]);
  return result.rows;
};

exports.updateStatus = async (id, status) => {
  const result = await db.query(
    "UPDATE orders SET status=$1 WHERE id=$2 RETURNING *",
    [status, id]
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  await db.query("DELETE FROM order_items WHERE order_id=$1", [id]);
  await db.query("DELETE FROM orders WHERE id=$1", [id]);
};
