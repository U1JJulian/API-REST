import express from "express";
import authMiddleware from "./middleware/basicAuth.js"; 

const app = express();

// ====== Ruta protegida con el middleware ======
app.get("/", authMiddleware, (req, res) => {
  res.send(`Bienvenido ${req.auth.user}, autenticacion correcta.`);
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
