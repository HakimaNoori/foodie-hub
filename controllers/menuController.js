const db = require("../db");

exports.addMenuItem = async (req, res) => {
  const { restaurantId } = req.params;
  const { name, price, available = true } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO menu_items (restaurant_id, name, price, available) VALUES ($1, $2, $3, $4) RETURNING *",
      [restaurantId, name, price, available]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMenuItems = async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const result = await db.query(
      "SELECT * FROM menu_items WHERE restaurant_id = $1",
      [restaurantId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, price, available } = req.body;
  try {
    const result = await db.query(
      "UPDATE menu_items SET name=$1, price=$2, available=$3 WHERE id=$4 RETURNING *",
      [name, price, available, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM menu_items WHERE id = $1", [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// (اختیاری) اگر toggleAvailability رو هم داری، باید اضافه بشه
exports.toggleAvailability = async (req, res) => {
  const { id } = req.params;
  try {
    const current = await db.query(
      "SELECT available FROM menu_items WHERE id = $1",
      [id]
    );
    const newStatus = !current.rows[0].available;
    const result = await db.query(
      "UPDATE menu_items SET available = $1 WHERE id = $2 RETURNING *",
      [newStatus, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
