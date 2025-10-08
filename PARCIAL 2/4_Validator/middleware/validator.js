// middleware/validator.js
import { check, validationResult } from "express-validator";

// Validación del campo "fruta"
export const validarFruta = [
  check("fruta")
    .exists().withMessage("El campo 'fruta' es obligatorio")
    .isString().withMessage("El campo 'fruta' debe ser un texto (string)"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Creamos un error con la lista de validaciones
      const error = new Error("Error al validar el valor del campo fruta");
      error.statusCode = 400; // Código HTTP 400 (Bad Request)
      error.details = errors.array(); // Detalles del error

      return next(error); // Pasamos el error al manejador global
    }

    next(); // Si no hay errores, sigue con el controlador
  },
];
