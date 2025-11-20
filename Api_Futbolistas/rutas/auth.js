// rutas/auth.js
import express from "express";
const router = express.Router();
import { register, login } from "../controller/authController.js";

/**
 * @swagger
 * tags:
 *   - name: auth
 *     description: Endpoints de autenticación
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthRegister:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           example: "juan123"
 *         password:
 *           type: string
 *           example: "secreto123"
 *
 *     AuthLogin:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           example: "juan123"
 *         password:
 *           type: string
 *           example: "secreto123"
 *
 *     AuthToken:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJSUzI1NiIsInR5cCI..."
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Mensaje de error"
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - auth
 *     summary: Registrar nuevo usuario
 *     x-codeSamples:
 *       - lang: JavaScript
 *         label: Fetch Example
 *         source: |
 *           fetch("http://localhost:3000/auth/register", {
 *             method: "POST",
 *             headers: { "Content-Type": "application/json" },
 *             body: JSON.stringify({
 *               username: "juan123",
 *               password: "secreto123"
 *             })
 *           })
 *           .then(r => r.json())
 *           .then(console.log);

 *       - lang: Python
 *         label: Python Requests
 *         source: |
 *           import requests
 *
 *           data = {"username": "juan123", "password": "secreto123"}
 *
 *           r = requests.post("http://localhost:3000/auth/register",
 *                              json=data)
 *
 *           print(r.json())

 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRegister'
 *
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *
 *       400:
 *         description: Error de validación o usuario ya existente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               faltanCampos:
 *                 summary: Faltan campos
 *                 value:
 *                   error: "Username y password son requeridos"
 *               usuarioExiste:
 *                 summary: Usuario duplicado
 *                 value:
 *                   error: "Usuario ya existe"
 *
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - auth
 *     summary: Iniciar sesión y obtener token JWT (RS256)
 *     x-codeSamples:
 *       - lang: JavaScript
 *         label: Fetch Example
 *         source: |
 *           fetch("http://localhost:3000/auth/login", {
 *             method: "POST",
 *             headers: { "Content-Type": "application/json" },
 *             body: JSON.stringify({
 *               username: "juan123",
 *               password: "secreto123"
 *             })
 *           })
 *           .then(r => r.json())
 *           .then(console.log);

 *       - lang: Python
 *         label: Python Requests
 *         source: |
 *           import requests
 *
 *           data = {"username": "juan123", "password": "secreto123"}
 *
 *           r = requests.post("http://localhost:3000/auth/login",
 *                              json=data)
 *
 *           print(r.json())

 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthLogin'
 *
 *     responses:
 *       200:
 *         description: Token devuelto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthToken'
 *
 *       400:
 *         description: Falta username o password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Username y password son requeridos"
 *
 *       401:
 *         description: Credenciales incorrectas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Credenciales incorrectas"
 *
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/login", login);

export default router;
