require("dotenv").config();
const {
  obtenerCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
} = require("../models/categorias");

exports.obtenerCategorias = async (req, res) => {
  try {
    const categorias = await obtenerCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerCategoriaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await obtenerCategoriaPorId(id);
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ message: "Categoría no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const categoriaActualizada = await actualizarCategoria(id, name);
    if (categoriaActualizada) {
      res.status(200).json(categoriaActualizada);
    } else {
      res.status(404).json({ message: "Categoría no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
