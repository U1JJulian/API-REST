// index.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import R_auth from "./rutas/auth.js";
import R_futbolista from "./rutas/futbolista.js";

import errorHandler from "./middleware/errorHandler.js";
import { swaggerDocs, swaggerSpec } from "./config/swagger.js";

import pkg from "redoc-express";
const redoc = pkg.default;

// Scalar
import { apiReference } from "@scalar/express-api-reference";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Rutas API
app.use("/auth", R_auth);
app.use("/futbolistas", R_futbolista);

// Swagger UI
swaggerDocs(app);

// Endpoint JSON para ReDoc y Scalar
app.get("/api-docs-json", (req, res) => {
  res.json(swaggerSpec);
});

// ReDoc
app.get(
  "/redoc",
  redoc({
    title: "API Futbolistas - Documentación",
    specUrl: "/api-docs-json",
  })
);

// Scalar API Reference
app.use(
  "/scalar",
  apiReference({
    theme: "dark",
    spec: {
      url: "/api-docs-json", 
    },
  })
);

// Middleware errores
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Server: http://localhost:${PORT}`);
  console.log(`📘 Swagger: http://localhost:${PORT}/docs`);
  console.log(`📕 ReDoc  : http://localhost:${PORT}/redoc`);
  console.log(`🟣 Scalar : http://localhost:${PORT}/scalar`);
});
