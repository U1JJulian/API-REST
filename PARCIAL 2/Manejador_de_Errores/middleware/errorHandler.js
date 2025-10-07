// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error("Error capturado desde errorHandler/Middleware:", err.message);
  res.status(500).json({ error: err.message });
};

export default errorHandler;
