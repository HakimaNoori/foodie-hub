
const db = require("../db");

exports.addRestaurant = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO restaurants (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRestaurants = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM restaurants");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRestaurantById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM restaurants WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const result = await db.query(
      "UPDATE restaurants SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM restaurants WHERE id = $1", [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
