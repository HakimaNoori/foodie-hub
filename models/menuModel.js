const db = require("../db");

exports.add = async ({ restaurant_id, name, price, is_available = true }) => {
  const result = await db.query(
    "INSERT INTO menu_items (restaurant_id, name, price, is_available) VALUES ($1, $2, $3, $4) RETURNING *",
    [restaurant_id, name, price, is_available]
  );
  return result.rows[0];
};

exports.update = async (id, { name, price, is_available }) => {
  const result = await db.query(
    "UPDATE menu_items SET name=$1, price=$2, is_available=$3 WHERE id=$4 RETURNING *",
    [name, price, is_available, id]
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  await db.query("DELETE FROM menu_items WHERE id=$1", [id]);
};

exports.getByRestaurant = async (restaurantId) => {
  const result = await db.query(
    "SELECT * FROM menu_items WHERE restaurant_id=$1",
    [restaurantId]
  );
  return result.rows;
};

exports.toggleAvailability = async (id, is_available) => {
  const result = await db.query(
    "UPDATE menu_items SET is_available=$1 WHERE id=$2 RETURNING *",
    [is_available, id]
  );
  return result.rows[0];
};
