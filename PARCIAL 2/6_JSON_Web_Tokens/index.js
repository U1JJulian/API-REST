import express from "express";
import jwt from "jsonwebtoken";
import { verificarToken } from "./middleware/auth.js";

const app = express();
app.use(express.json());

const SECRET_KEY = "mi_clave_secreta"; 


app.post("/login", (req, res) => {
  const { usuario, password } = req.body;
  if (usuario === "admin" && password === "1234") {
    const token = jwt.sign({ usuario }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ token });
  }
  res.status(401).json({ mensaje: "Credenciales incorrectas" });
});


app.get("/perfil", verificarToken, (req, res) => {
  res.json({
    mensaje: "Accediste al perfil protegido",
    usuario: req.user.usuario,
  });
});


app.listen(3001, () => console.log("Servidor en http://localhost:3001"));
