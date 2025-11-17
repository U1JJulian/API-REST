// config/swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Futbolistas",
      version: "1.0.0",
      description: "Documentación de la API de jugadores de fútbol",
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
      bearerFormat: "JWT"
    }
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
        shirt_number: { type: "integer", example: 10 }
      }
    },

    FutbolistaCreate: {
      type: "object",
      required: ["name", "nationality", "position", "age"],
      properties: {
        name: { type: "string", example: "Kylian Mbappé" },
        nationality: { type: "string", example: "Francia" },
        position: { type: "string", example: "Delantero" },
        age: { type: "integer", example: 26 }
      }
    }
  }
}

  },

  apis: [
    `${path.join(__dirname, "../rutas/*.js")}`,
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Swagger listo en: http://localhost:3000/docs");
};
