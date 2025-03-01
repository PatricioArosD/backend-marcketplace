const { pool } = require("../db/config");

exports.crearOrder = async (user_id, total, status_id) => {
  try {
    const SQLquery =
      "INSERT INTO orders (user_id, total, status_id) VALUES ($1, $2, $3) RETURNING *";
    const SQLvalues = [user_id, total, status_id];
    const result = await pool.query(SQLquery, SQLvalues);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error al crear la orden: " + error);
  }
};

exports.crearOrderDetail = async (order_id, product_id, quantity) => {
  try {
    const SQLquery =
      "INSERT INTO order_details (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";
    const SQLvalues = [order_id, product_id, quantity];
    const result = await pool.query(SQLquery, SQLvalues);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error al crear el detalle de la orden: " + error);
  }
};

exports.obtenerOrderPorId = async (id) => {
  try {
    const SQLquery = "SELECT * FROM orders WHERE id = $1";
    const SQLvalues = [id];
    const result = await pool.query(SQLquery, SQLvalues);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error al obtener la orden: " + error);
  }
};

exports.obtenerOrderDetailsPorOrderId = async (order_id) => {
  try {
    const SQLquery = "SELECT * FROM order_details WHERE order_id = $1";
    const SQLvalues = [order_id];
    const result = await pool.query(SQLquery, SQLvalues);
    return result.rows;
  } catch (error) {
    throw new Error("Error al obtener los detalles de la orden: " + error);
  }
};

exports.obtenerOrdersPorUsuarioId = async (user_id) => {
  try {
    const SQLquery = "SELECT * FROM orders WHERE user_id = $1";
    const SQLvalues = [user_id];
    const result = await pool.query(SQLquery, SQLvalues);
    return result.rows;
  } catch (error) {
    throw new Error("Error al obtener las órdenes del usuario: " + error);
  }
};
