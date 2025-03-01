const jwt = require("jsonwebtoken");
const pool = require("../db/config");
require("dotenv").config();
const bcrypt = require("bcrypt");
const {
  crearCart,
  obtenerCartPorId,
  actualizarCart,
} = require("../models/cart");

exports.crearCart = async (req, res) => {
  const { user_id, total, status_id } = req.body;
  try {
    const nuevoCart = await crearCart(user_id, total, status_id);
    res.status(201).json(nuevoCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerCartPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await obtenerCartPorId(id);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Carrito no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarCart = async (req, res) => {
  const { id } = req.params;
  const { user_id, total, status_id } = req.body;
  try {
    const cartActualizado = await actualizarCart(user_id, total, status_id, id);
    if (cartActualizado) {
      res.status(200).json(cartActualizado);
    } else {
      res.status(404).json({ message: "Carrito no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
