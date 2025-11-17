// rutas/futbolista.js
import express from "express";
const router = express.Router();
import { obtenerFutbolista, insertarFutbolista, obtenerFutbolistaPorId } from "../controller/futbolistaController.js";
import { verificarToken } from "../middleware/auth.js";

/**
 * @swagger
 * tags:
 *   - name: futbolistas
 *     description: Endpoints para gestionar futbolistas
 */

/**
 * @swagger
 * /futbolistas:
 *   get:
 *     tags:
 *       - futbolistas
 *     summary: Obtener todos los futbolistas
 *     responses:
 *       200:
 *         description: Lista de futbolistas obtenida correctamente.
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno del servidor"
 */
router.get("/", obtenerFutbolista);

/**
 * @swagger
 * /futbolistas/{id}:
 *   get:
 *     tags:
 *       - futbolistas
 *     summary: Obtener un futbolista por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del futbolista
 *     responses:
 *       200:
 *         description: Futbolista encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Futbolista'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             examples:
 *               idNoEsNumero:
 *                 summary: ID no numérico
 *                 value:
 *                   error: "El ID debe ser un entero positivo"
 *               idNegativo:
 *                 summary: ID negativo
 *                 value:
 *                   error: "El ID debe ser un entero positivo"
 *       404:
 *         description: Futbolista no encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: "Futbolista no encontrado"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno del servidor"
 */
router.get("/:id", obtenerFutbolistaPorId);

/**
 * @swagger
 * /futbolistas:
 *   post:
 *     tags:
 *       - futbolistas
 *     summary: Crear un nuevo futbolista (requiere token JWT)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FutbolistaCreate'
 *     responses:
 *       201:
 *         description: Futbolista creado correctamente.
 *       400:
 *         description: Error en los datos enviados
 *         content:
 *           application/json:
 *             examples:
 *               sinNombre:
 *                 summary: Falta nombre
 *                 value:
 *                   error: "El nombre es obligatorio"
 *               sinNacionalidad:
 *                 summary: Falta nacionalidad
 *                 value:
 *                   error: "La nacionalidad es obligatoria"
 *               sinPosicion:
 *                 summary: Falta posición
 *                 value:
 *                   error: "La posición es obligatoria"
 *               edadInvalida:
 *                 summary: Edad negativa o no válida
 *                 value:
 *                   error: "La edad debe ser un número entero mayor a 0"
 *       401:
 *         description: Token no enviado o inválido
 *         content:
 *           application/json:
 *             examples:
 *               sinToken:
 *                 summary: No envió token
 *                 value:
 *                   error: "Token requerido"
 *               tokenInvalido:
 *                 summary: Token incorrecto
 *                 value:
 *                   error: "Token inválido"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno del servidor"
 */
router.post("/", verificarToken, insertarFutbolista);

export default router;
