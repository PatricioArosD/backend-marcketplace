const jwt = require("jsonwebtoken");
const pool = require("../db/config");
require("dotenv").config();
const {
  crearProducto,
  obtenerProductos,
  buscarProductoPorCategoria,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} = require("../models/productos");
const bcrypt = require("bcrypt");

exports.crearProducto = async (req, res) => {
  const {id:seller_id} = req.user;
  const { title, description, price, img, category_id } = req.body;
  try {
    const nuevoProducto = await crearProducto(
      title,
      description,
      price,
      img,
      category_id,
      seller_id
    );
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await obtenerProductos();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.buscarProductoPorCategoria = async (req, res) => {
  const { category_id } = req.params;
  try {
    const producto = await buscarProductoPorCategoria(category_id);
    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerProductoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await obtenerProductoPorId(id);
    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, img, category_id } = req.body;
  try {
    const productoActualizado = await actualizarProducto(
      title,
      description,
      price,
      img,
      category_id,
      id
    );
    if (productoActualizado) {
      res.status(200).json(productoActualizado);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const productoEliminado = await eliminarProducto(id);
    if (productoEliminado) {
      res.status(200).json(productoEliminado);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
