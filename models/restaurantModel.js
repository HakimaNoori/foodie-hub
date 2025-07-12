const db = require("../db");

exports.getAll = async () => {
  const result = await db.query("SELECT * FROM restaurants");
  return result.rows;
};

exports.create = async ({ name, address, phone }) => {
  const result = await db.query(
    "INSERT INTO restaurants (name, address, phone) VALUES ($1, $2, $3) RETURNING *",
    [name, address, phone]
  );
  return result.rows[0];
};

exports.update = async (id, { name, address, phone }) => {
  const result = await db.query(
    "UPDATE restaurants SET name=$1, address=$2, phone=$3 WHERE id=$4 RETURNING *",
    [name, address, phone, id]
  );
  return result.rows[0];
};

exports.delete = async (id) => {
  await db.query("DELETE FROM restaurants WHERE id=$1", [id]);
};
