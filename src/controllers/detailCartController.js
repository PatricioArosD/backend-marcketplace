const jwt = require("jsonwebtoken");
const pool = require("../db/config");
require("dotenv").config();
const bcrypt = require("bcrypt");
const {
  crearDetailCart,
  obtenerDetailCartPorId,
  actualizarDetailCart,
  eliminarDetailCart,
} = require("../models/detailCart");

exports.crearDetailCart = async (req, res) => {
  const { cart_id, product_id } = req.body;
  try {
    const nuevoDetailCart = await crearDetailCart(cart_id, product_id);
    res.status(201).json(nuevoDetailCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerDetailCartPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const detallesCarrito = await obtenerDetailCartPorId(id);
    if (detallesCarrito.length === 0) {
      return res.status(400).json({ message: "Carrito vacío" });
    }
    res.status(200).json(detallesCarrito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarDetailCart = async (req, res) => {
  const { id } = req.params;
  const { cart_id, product_id } = req.body;
  try {
    const detailCartActualizado = await actualizarDetailCart(cart_id, product_id, id);
    if (detailCartActualizado) {
      res.status(200).json(detailCartActualizado);
    } else {
      res.status(404).json({ message: "Detalle del carrito no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarDetailCart = async (req, res) => {
  const { id } = req.params;
  try {
    const detailCartEliminado = await eliminarDetailCart(id);
    if (detailCartEliminado) {
      res.status(200).json(detailCartEliminado);
    } else {
      res.status(404).json({ message: "Detalle del carrito no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
