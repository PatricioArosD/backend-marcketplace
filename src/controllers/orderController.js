const {
  crearOrder,
  crearOrderDetail,
  obtenerOrderPorId,
  obtenerOrderDetailsPorOrderId,
  obtenerOrdersPorUsuarioId,
} = require("../models/order");

exports.crearOrder = async (req, res) => {
  const { user_id, total, status_id, products } = req.body;
  try {
    const nuevaOrder = await crearOrder(user_id, total, status_id);
    const orderId = nuevaOrder.id;
    const orderDetails = await Promise.all(
      products.map(product => crearOrderDetail(orderId, product.id, product.quantity))
    );
    res.status(201).json({ order: nuevaOrder, details: orderDetails });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerOrderPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await obtenerOrderPorId(id);
    const details = await obtenerOrderDetailsPorOrderId(id);
    if (order) {
      res.status(200).json({ order, details });
    } else {
      res.status(404).json({ message: "Orden no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerOrdersPorUsuarioId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const orders = await obtenerOrdersPorUsuarioId(user_id);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
