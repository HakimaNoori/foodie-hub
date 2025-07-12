const db = require("../db");

exports.create = async ({ name, phone }) => {
  const result = await db.query(
    "INSERT INTO customers (name, phone) VALUES ($1, $2) RETURNING *",
    [name, phone]
  );
  return result.rows[0];
};

exports.getAll = async () => {
  const result = await db.query("SELECT * FROM customers");
  return result.rows;
};

exports.update = async (id, { name, phone }) => {
  const result = await db.query(
    "UPDATE customers SET name=$1, phone=$2 WHERE id=$3 RETURNING *",
    [name, phone, id]
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  await db.query("DELETE FROM customers WHERE id=$1", [id]);
};
