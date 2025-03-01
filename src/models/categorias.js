const { pool } = require("../db/config");

exports.obtenerCategorias = async () => {
  try {
    const SQLquery = "SELECT * FROM categories";
    const result = await pool.query(SQLquery);
    return result.rows;
  } catch (error) {
    throw new Error("Error al obtener las categorias: " + error);
  }
};

exports.obtenerCategoriaPorId = async (id) => {
  try {
    const SQLquery = "SELECT * FROM categories WHERE id = $1";
    const SQLvalues = [id];
    const result = await pool.query(SQLquery, SQLvalues);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error al obtener la categoria: " + error);
  }
};

exports.actualizarCategoria = async (id, name) => {
  try {
    const SQLquery =
      "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *";
    const SQLvalues = [name, id];
    const result = await pool.query(SQLquery, SQLvalues);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error al actualizar la categoria: " + error);
  }
};
