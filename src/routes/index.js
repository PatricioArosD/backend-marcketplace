const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const usuariosController = require("../controllers/usuariosController");
const productosController = require("../controllers/productosController");
const categoriasController = require("../controllers/categoriasController");
const statusController = require("../controllers/statusController");
const cartController = require("../controllers/cartController");
const detailCartController = require("../controllers/detailCartController");
const orderController = require("../controllers/orderController");
const likesController = require("../controllers/likesController");

module.exports = () => {
  router.get("/", (req, res) => {
    res.status(200).send("Bienvenido a mi Marketplace");
  });

  // Usuarios
  router.post("/registrar_usuario", usuariosController.registrarUsuario);
  router.post("/iniciar_sesion", usuariosController.login);
  router.get("/usuarios", auth, usuariosController.obtenerUsuarios);
  router.get("/usuarios/:id", auth, usuariosController.obtenerUsuarioPorId);
  router.delete("/usuarios/:id", auth, usuariosController.eliminarUsuario);
  router.put("/usuarios/:id", auth, usuariosController.actualizarUsuario);

  // Productos
  router.get("/productos", productosController.obtenerProductos);
  router.post("/productos", auth, productosController.crearProducto);
  router.get("/productos/:id", productosController.obtenerProductoPorId);
  router.put("/productos/:id", auth, productosController.actualizarProducto);
  router.delete("/productos/:id", auth, productosController.eliminarProducto);

  // Categorias
  router.get("/categorias", categoriasController.obtenerCategorias);
  router.get("/categorias/:id", categoriasController.obtenerCategoriaPorId);
  router.put("/categorias/:id", auth, categoriasController.actualizarCategoria);

  // Status
  router.get("/status/:id", statusController.obtenerStatusPorId);
  router.put("/status/:id", auth, statusController.actualizarStatus);
  router.get("/status", statusController.obtenerStatus);

  // Carrito
  router.post("/cart", auth, cartController.crearCart);
  router.get("/cart/:id", auth, cartController.obtenerCartPorId);
  router.put("/cart/:id", auth, cartController.actualizarCart);

  // Detalle del Carrito
  router.post("/detail_cart", auth, detailCartController.crearDetailCart);
  router.get("/detail_cart/:id", auth, detailCartController.obtenerDetailCartPorId);
  router.put("/detail_cart/:id", auth, detailCartController.actualizarDetailCart);
  router.delete("/detail_cart/:id", auth, detailCartController.eliminarDetailCart);

  // Ordenes
  router.post("/orders", auth, orderController.crearOrder);
  router.get("/orders/:id", auth, orderController.obtenerOrderPorId);
  router.get("/orders/user/:user_id", auth, orderController.obtenerOrdersPorUsuarioId);

  // Likes
  router.get("/likes", auth, likesController.obtenerLikes);
  router.get("/likes/user/:user_id", auth, likesController.obtenerLikesPorUsuarioId);
  router.post("/likes", auth, likesController.crearLike);
  router.delete("/likes/:id", auth, likesController.eliminarLike);

  return router;
};
