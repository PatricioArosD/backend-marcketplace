const { pool } = require("../db/config");

exports.registrarUsuario = async (name, email, password) => {
  try {
    const SQLquery =
      "INSERT INTO users (name,email,password) VALUES ($1, $2, $3)";
    const SQLvalues = [name, email, password];
    const result = await pool.query(SQLquery, SQLvalues);
    return result[0];
  } catch (error) {
    throw new Error("Error al crear usuario: " + error);
  }
};

exports.buscarUsuarioPorEmail = async (email) => {
  try {
    const SQLquery = "SELECT * FROM users WHERE email = $1";
    const SQLvalues = [email];
    const result = await pool.query(SQLquery, SQLvalues);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error al buscar el correo: " + error);
  }
};

exports.obtenerUsuarios = async () => {
  try {
    const SQLquery = `SELECT * FROM users`;
    const result = await pool.query(SQLquery);
    return result.rows;
  } catch (error) {
    throw new Error("Error al obtener los usuarios: " + error);
  }
};

exports.eliminarUsuario = async (id) => {
  try {
    const SQLquery = "DELETE FROM users WHERE id = $1";
    const SQLvalues = [id];
    const result = await pool.query(SQLquery, SQLvalues);
    return result;
  } catch (error) {
    throw new Error("Error al eliminar el usuario: " + error);
  }
};

exports.actualizarUsuario = async (id, { name, email, password }) => {
  try {
    const fields = [];
    const values = [];
    let query = "UPDATE users SET ";

    if (name) {
      fields.push("name = $1");
      values.push(name);
    }
    if (email) {
      fields.push("email = $2");
      values.push(email);
    }
    if (password) {
      fields.push("password = $3");
      values.push(password);
    }

    query += fields.join(", ") + " WHERE id = $4 RETURNING *";
    values.push(id);

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error al actualizar el usuario: " + error);
  }
};

exports.buscarUsuarioPorId = async (id) => {
  try {
    const SQLquery = "SELECT * FROM users WHERE id = $1";
    const SQLvalues = [id];
    const result = await pool.query(SQLquery, SQLvalues);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error al obtener el usuario por ID: " + error);
  }
};
