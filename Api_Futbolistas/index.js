// index.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import R_auth from "./rutas/auth.js";
import R_futbolista from "./rutas/futbolista.js";
import errorHandler from "./middleware/errorHandler.js";
import { swaggerDocs } from "./config/swagger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.use("/auth", R_auth);
app.use("/futbolistas", R_futbolista);

// Swagger
swaggerDocs(app);

// Manejador de errores (al final)
app.use(errorHandler);

// Servidor
app.listen(PORT, () => {
  console.log(`✅ Server: http://localhost:${PORT}`);
});
