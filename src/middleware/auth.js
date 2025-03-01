const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error); // Depuración
    return res.status(401).json({ message: "Token inválido" });
  }
};
