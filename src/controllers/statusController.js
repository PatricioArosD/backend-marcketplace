const {
  obtenerStatusPorId,
  actualizarStatus,
  obtenerStatus,
} = require("../models/status");

exports.obtenerStatusPorId = async (req, res) => {
  let { id } = req.params;
  try {
    const result = await obtenerStatusPorId(id);
    if (result === undefined) {
      return res.status(404).json({ msg: "Estado no encontrado" });
    }
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al obtener el estado", error: error.message });
  }
};

exports.obtenerStatus = async (req, res) => {
  try {
    const result = await obtenerStatus();
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al obtener los estados", error: error.message });
  }
};

exports.actualizarStatus = async (req, res) => {
  let { id } = req.params;
  let { name } = req.body;
  try {
    const result = await actualizarStatus(name, id);
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Estado no encontrado" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al actualizar el estado", error: error.message });
  }
};
