const { pool } = require("../db/config");

exports.obtenerStatusPorId = async (id) => {
  try {
    const SQLquery = "SELECT * FROM status WHERE id = $1";
    const SQLvalues = [id];
    const result = await pool.query(SQLquery, SQLvalues);
    const [statusId] = result.rows;
    return statusId;
  } catch (error) {
    throw new Error("Error al obtener el estado: " + error);
  }
};

exports.obtenerStatus = async () => {
  try {
    const SQLquery = "SELECT * FROM status";
    const result = await pool.query(SQLquery);
    return result.rows;
  } catch (error) {
    throw new Error("Error al obtener los estados: " + error);
  }
};

exports.actualizarStatus = async (name, id) => {
  try {
    const SQLquery = "UPDATE status SET name = $1 WHERE id = $2 RETURNING *";
    const SQLvalues = [name, id];
    const result = await pool.query(SQLquery, SQLvalues);
    return result;
  } catch (error) {
    throw new Error("Error al actualizar el estado: " + error);
  }
};
