// middleware/errorHandler.js

//Middleware para detectar errores 
const errorHandler = (err, req, res, next) => {
  console.error("Error capturado:", err.message);
  res.status(500).json({ error: err.message });
};

export default errorHandler;
