import basicAuth from "express-basic-auth";

const authMiddleware = basicAuth({
  users: { admin: "1234", julian: "abcd" }, // usuario: contraseña
  challenge: true, // pide login en navegador si accedes desde él
  unauthorizedResponse: (req) => "Acceso denegado. Credenciales invalidas."
});


export default authMiddleware;
