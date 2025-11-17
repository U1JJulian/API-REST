// middleware/errorHandler.js

//Middleware para detectar errores 
const errorHandler = (err, req, res, next) => {
  console.error("Error capturado:", err.message || err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Error del servidor" });
};

export default errorHandler;
