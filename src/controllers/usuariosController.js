const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const {
  registrarUsuario,
  buscarUsuarioPorEmail,
  obtenerUsuarios,
  eliminarUsuario,
  actualizarUsuario,
  buscarUsuarioPorId,
} = require("../models/usuarios");

exports.registrarUsuario = async (req, res) => {
  let { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }
    password = await bcrypt.hash(password, 12);
    await registrarUsuario(name, email, password);
    res.status(201).json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "Ups, algo salió mal", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await buscarUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ msg: "El usuario no existe" });
    }
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }
    const token = jwt.sign(
      { id: usuario.id, name: usuario.name, email: usuario.email },
      process.env.SECRET,
      { expiresIn: '1h' }
    );
    console.log("Token recibido:", token);
    res.status(201).json({ msg: "Usuario logueado correctamente", token, usuario });
  } catch (error) {
    res.status(401).json({ msg: "Hubo un error al loguear el usuario" });
  }
};

exports.obtenerUsuarios = async (req, res) => {
  try {
    const result = await obtenerUsuarios();
    res.status(201).json({ result });
  } catch (error) {
    res.status(401).json({ mensaje: error.message });
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await eliminarUsuario(id);
    res.status(201).json({ msg: "Usuario Eliminado correctamente", result });
  } catch (error) {
    res.status(401).json({ mensaje: error.message });
  }
};

exports.actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const hashedPassword = password ? await bcrypt.hash(password, 12) : undefined;
    const result = await actualizarUsuario(id, { name, email, password: hashedPassword });
    res.status(200).json({ msg: "Usuario actualizado correctamente", result });
  } catch (error) {
    res.status(400).json({ msg: "Error al actualizar el usuario", error: error.message });
  }
};

exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await buscarUsuarioPorId(id);
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    res.status(200).json({ usuario });
  } catch (error) {
    res.status(400).json({ msg: "Error al obtener el usuario", error: error.message });
  }
};
