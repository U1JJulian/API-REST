// controller/futbolistaController.js
import { pool } from "../config/db.js";

/**
 * Obtener todos los futbolistas con su equipo actual (si existe).
 */
export async function obtenerFutbolista(req, res, next) {
  try {
    const [rows] = await pool.query(`
      SELECT p.id, p.name, p.nationality, p.position, p.age,
             t.name AS team, ph.start_year, ph.end_year, ph.shirt_number
      FROM players p
      LEFT JOIN player_history ph ON p.id = ph.player_id 
           AND (ph.end_year IS NULL OR ph.end_year = (
               SELECT MAX(COALESCE(end_year, 999999)) FROM player_history WHERE player_id = p.id
             ))
      LEFT JOIN teams t ON ph.team_id = t.id
    `);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

/**
 * Insertar un nuevo futbolista (requiere token)
 */
export async function insertarFutbolista(req, res, next) {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ error: "No se recibieron datos" });

    const { name, nationality, position, age } = data;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }
    if (!nationality || typeof nationality !== "string" || nationality.trim() === "") {
      return res.status(400).json({ error: "La nacionalidad es obligatoria" });
    }
    if (!position || typeof position !== "string" || position.trim() === "") {
      return res.status(400).json({ error: "La posición es obligatoria" });
    }
    const numAge = Number(age);
    if (!Number.isInteger(numAge) || numAge <= 0) {
      return res.status(400).json({ error: "La edad debe ser un número entero mayor a 0" });
    }

    const [result] = await pool.query(
      "INSERT INTO players (name, nationality, position, age) VALUES (?, ?, ?, ?)",
      [name.trim(), nationality.trim(), position.trim(), numAge]
    );

    res.status(201).json({
      id: result.insertId,
      name: name.trim(),
      nationality: nationality.trim(),
      position: position.trim(),
      age: numAge
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Obtener futbolista por id
 */
export async function obtenerFutbolistaPorId(req, res, next) {
  try {
    const { id } = req.params;
    const numId = Number(id);
    if (!Number.isInteger(numId) || numId <= 0) {
      return res.status(400).json({ error: "El ID debe ser un entero positivo" });
    }
    const [rows] = await pool.query("SELECT * FROM players WHERE id = ?", [numId]);
    if (rows.length === 0) return res.status(404).json({ error: "Futbolista no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}
