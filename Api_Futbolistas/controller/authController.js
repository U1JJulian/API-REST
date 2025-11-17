// controller/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const privateKey = fs.readFileSync(path.join(__dirname, "../keys/privada.pem"), "utf8");

/**
 * @desc Registrar usuario (username y password)
 */
export async function register(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Username y password son requeridos" });

    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.query("INSERT INTO usuarios (username, password) VALUES (?, ?)", [username, hashed]);

    res.status(201).json({ id: result.insertId, username });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ error: "Usuario ya existe" });
    next(err);
  }
}

/**
 * @desc Login -> devuelve JWT firmado con RSA (privada.pem)
 */
export async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Username y password son requeridos" });

    const [rows] = await pool.query("SELECT * FROM usuarios WHERE username = ?", [username]);
    if (rows.length === 0) return res.status(401).json({ error: "Credenciales incorrectas" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Credenciales incorrectas" });

    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, privateKey, { algorithm: "RS256", expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    next(err);
  }
}
