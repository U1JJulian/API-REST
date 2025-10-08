// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error("Error capturado desde errorHandler/Middleware:", err.message);

  // Código de estado (por defecto 500)
  const statusCode = err.statusCode || 500;

  // Si hay detalles de validación, los devolvemos también
  res.status(statusCode).json({
    error: err.message,
    detalles: err.details || null,
  });
};

export default errorHandler;
