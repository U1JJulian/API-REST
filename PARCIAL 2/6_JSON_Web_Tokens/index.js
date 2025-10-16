import express from "express";
import jwt from "jsonwebtoken";
import fs from "fs";
import { verificarToken } from "./middleware/auth.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const privateKey = fs.readFileSync(path.join(__dirname, "keys/privada.pem"), "utf8");
//const publicKey = fs.readFileSync(path.join(__dirname, "keys/publica.pem"), "utf8");

// ====== Ruta de login ======
app.post("/login", (req, res) => {
  const { usuario, password } = req.body;

  if (usuario === "admin" && password === "1234") {
    // Firmar token con la clave privada y RS256
    const token = jwt.sign({ usuario }, privateKey, {
      algorithm: "RS256",
      expiresIn: "1h",
    });

    return res.json({ token });
  }

  res.status(401).json({ mensaje: "Credenciales incorrectas" });
});

// ====== Ruta protegida ======
app.get("/perfil", verificarToken, (req, res) => {
  res.json({
    mensaje: "Accediste al perfil protegido",
    usuario: req.user.usuario,
  });
});

app.listen(3001, () => console.log("Servidor en http://localhost:3001"));
