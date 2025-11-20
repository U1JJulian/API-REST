// config/swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Themes
import { SwaggerTheme } from "swagger-themes";
const theme = new SwaggerTheme().getBuffer("dark");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readmePath = path.join(__dirname, "../README.md");
const readmeContent = fs.readFileSync(readmePath, "utf-8");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Futbolistas",
      version: "1.0.0",
      description: readmeContent,   // 👈 README como portada
    },

    servers: [
      {
        url: "http://localhost:3000",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        Futbolista: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Lionel Messi" },
            nationality: { type: "string", example: "Argentina" },
            position: { type: "string", example: "Delantero" },
            age: { type: "integer", example: 36 },
            team: { type: "string", example: "FC Barcelona" },
            start_year: { type: "integer", example: 2004 },
            end_year: { type: "integer", nullable: true, example: null },
            shirt_number: { type: "integer", example: 10 },
          },
        },

        FutbolistaCreate: {
          type: "object",
          required: ["name", "nationality", "position", "age"],
          properties: {
            name: { type: "string", example: "Kylian Mbappé" },
            nationality: { type: "string", example: "Francia" },
            position: { type: "string", example: "Delantero" },
            age: { type: "integer", example: 26 },
          },
        },
      },
    },
  },

  apis: [`${path.join(__dirname, "../rutas/*.js")}`],
};

// JSON para Swagger + ReDoc
export const swaggerSpec = swaggerJsdoc(options);

// 🎮 Swagger UI con tema Drácula Gamer y README de portada
export const swaggerDocs = (app) => {
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCss: theme,
      customSiteTitle: "API Futbolistas",
      customfavIcon: "https://cdn-icons-png.flaticon.com/512/861/861256.png" // opcional gamer
    })
  );
};