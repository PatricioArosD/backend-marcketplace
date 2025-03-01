const { pool } = require("../db/config");

exports.crearProducto = async (
  title,
  description,
  price,
  img,
  category_id,
  seller_id
) => {
  try {
    const SQLquery =
      "INSERT INTO products (title, description, price, img, category_id, seller_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const SQLvalues = [title, description, price, img, category_id, seller_id];
    const result = await pool.query(SQLquery, SQLvalues);
    return result.rows;
  } catch (error) {
    throw new Error("Error al crear el producto: " + error);
  }
};

exports.obtenerProductos = async () => {
  try {
    const SQLquery = "SELECT * FROM products";
    const result = await pool.query(SQLquery);
    return result.rows;
  } catch (error) {
    throw new Error("Error al crear el producto: " + error);
  }
};

exports.obtenerProductoPorId = async (id) => {
  try {
    const SQLquery = "SELECT * FROM products WHERE id = $1";
    const SQLvalues = [id];
    const result = await pool.query(SQLquery, SQLvalues);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error al obtener el producto: " + error);
  }
};

exports.actualizarProducto = async (
  title,
  description,
  price,
  img,
  category_id,
  id
) => {
  try {
    const SQLquery =
      "UPDATE products SET title = $1, description = $2, price = $3, img = $4, category_id = $5 WHERE id = $6 RETURNING *";
    const SQLvalues = [
      title,
      description,
      price,
      img,
      category_id,
      id,
    ];
    const result = await pool.query(SQLquery, SQLvalues);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error al actualizar el producto: " + error);
  }
};

exports.eliminarProducto = async (id) => {
  try {
    const SQLquery = "DELETE FROM products WHERE id = $1 RETURNING *";
    const SQLvalues = [id];
    const result = await pool.query(SQLquery, SQLvalues);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error al eliminar el producto: " + error);
  }
};
