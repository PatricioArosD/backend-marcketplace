const { pool } = require("../db/config");

exports.obtenerLikes = async (user_id) => {
  try {
    const SQLquery = "SELECT * FROM likes WHERE user_id = $1";
    const SQLvalues = [user_id];
    const result = await pool.query(SQLquery, SQLvalues);
    return result.rows;
  } catch (error) {
    throw new Error("Error al obtener los likes: " + error);
  }
};

exports.crearLike = async (user_id, product_id) => {
  try {
    const SQLquery = "INSERT INTO likes (user_id, product_id) VALUES ($1, $2) RETURNING *";
    const SQLvalues = [user_id, product_id];
    const result = await pool.query(SQLquery, SQLvalues);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error al crear el like: " + error);
  }
};

exports.eliminarLike = async (id) => {
  try {
    const SQLquery = "DELETE FROM likes WHERE id = $1";
    const SQLvalues = [id];
    await pool.query(SQLquery, SQLvalues);
  } catch (error) {
    throw new Error("Error al eliminar el like: " + error);
  }
};
