import jwt from "jsonwebtoken";

// Clave secreta (usa variable de entorno en producción)
const SECRET_KEY = "mi_clave_secreta";

// ====== Middleware de verificación JWT ======
export const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Espera formato "Bearer <token>"

  if (!token) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verifica el token
    req.user = decoded; // Guarda los datos del usuario en la request
    next(); // Continúa a la siguiente función
  } catch (error) {
    return res.status(403).json({ mensaje: "Token inválido o expirado" });
  }
};
