const { pool } = require("../db/config");

exports.crearCart = async (user_id, total, status_id) => {
  try {
    const SQLquery =
      "INSERT INTO cart (user_id, total, status_id) VALUES ($1, $2, $3) RETURNING *";
    const SQLvalues = [user_id, total, status_id];
    const result = await pool.query(SQLquery, SQLvalues);
    return result.rows;
  } catch (error) {
    throw new Error("Error al agregar al carrito: " + error);
  }
};

exports.obtenerCartPorId = async (id) => {
  try {
    const SQLquery = "SELECT * FROM cart WHERE id = $1";
    const SQLvalues = [id];
    const result = await pool.query(SQLquery, SQLvalues);
    return result.rows;
  } catch (error) {
    throw new Error("Error al obtener el carrito: " + error);
  }
};

exports.actualizarCart = async (user_id, total, status_id, id) => {
  try {
    const SQLquery =
      "UPDATE cart SET user_id = $1, total = $2, status_id = $3 WHERE id = $4 RETURNING *";
    const SQLvalues = [user_id, total, status_id, id];
    const result = await pool.query(SQLquery, SQLvalues);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error al actualizar el carrito: " + error);
  }
};

exports.crearDetailCart = async (cart_id, product_id) => {
  try {
    const SQLquery =
      "INSERT INTO detail_cart (cart_id, product_id) VALUES ($1, $2) RETURNING *";
    const SQLvalues = [cart_id, product_id];
    const result = await pool.query(SQLquery, SQLvalues);
    return result.rows;
  } catch (error) {
    throw new Error("Error al agregar al carrito: " + error);
  }
};

exports.obtenerDetailCartPorId = async (id) => {
  try {
    const SQLquery = "SELECT * FROM detail_cart WHERE cart_id = $1";
    const SQLvalues = [id];
    const result = await pool.query(SQLquery, SQLvalues);
    return result.rows;
  } catch (error) {
    throw new Error("Error al obtener el detalle del carrito: " + error);
  }
};

exports.actualizarDetailCart = async (cart_id, product_id, id) => {
  try {
    const SQLquery =
      "UPDATE detail_cart SET cart_id = $1, product_id = $2 WHERE id = $3 RETURNING *";
    const SQLvalues = [cart_id, product_id, id];
    const result = await pool.query(SQLquery, SQLvalues);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error al actualizar el detalle del carrito: " + error);
  }
};

exports.eliminarDetailCart = async (id) => {
  try {
    const SQLquery = "DELETE FROM detail_cart WHERE id = $1 RETURNING *";
    const SQLvalues = [id];
    const result = await pool.query(SQLquery, SQLvalues);
    return result.rows;
  } catch (error) {
    throw new Error("Error al eliminar el detalle del carrito: " + error);
  }
};
