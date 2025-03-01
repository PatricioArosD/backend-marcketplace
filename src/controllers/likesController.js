const { obtenerLikes, crearLike, eliminarLike } = require("../models/likes");

exports.obtenerLikes = async (req, res) => {
  try {
    const likes = await obtenerLikes(req.user.id);
    res.status(200).json({ likes });
  } catch (error) {
    res.status(400).json({ msg: "Error al obtener los likes", error: error.message });
  }
};

exports.crearLike = async (req, res) => {
  try {
    const { product_id } = req.body;
    const like = await crearLike(req.user.id, product_id);
    res.status(201).json({ msg: "Like creado correctamente", like });
  } catch (error) {
    res.status(400).json({ msg: "Error al crear el like", error: error.message });
  }
};

exports.eliminarLike = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarLike(id);
    res.status(200).json({ msg: "Like eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "Error al eliminar el like", error: error.message });
  }
};

exports.obtenerLikesPorUsuarioId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const likes = await obtenerLikes(user_id);
    res.status(200).json({ likes });
  } catch (error) {
    res.status(400).json({ msg: "Error al obtener los likes del usuario", error: error.message });
  }
};
