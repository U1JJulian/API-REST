import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";

// === Esto crea una ruta absoluta correcta ===
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicKeyPath = path.join(__dirname, "../keys/publica.pem");

// === Leer la clave pública ===
const publicKey = fs.readFileSync(publicKeyPath, "utf8");

export function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] });
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
}
