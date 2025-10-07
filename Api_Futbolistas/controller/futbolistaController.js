import { createPool } from "mysql2/promise";

// Crear el pool de conexiones
export const pool = createPool({
  host: "localhost",
  user: "root",       
  password: "admin",  
  database: "futbolista", // aquí va tu base de datos
  port: 3306
});

// Obtener todos los futbolistas con su historial (último equipo)
export async function obtenerFutbolista(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT p.id, p.name, p.nationality, p.position, p.age,
             t.name AS team, ph.start_year, ph.end_year, ph.shirt_number
      FROM players p
      LEFT JOIN player_history ph ON p.id = ph.player_id 
                                   AND (ph.end_year IS NULL OR ph.end_year = (SELECT MAX(end_year) FROM player_history WHERE player_id = p.id))
      LEFT JOIN teams t ON ph.team_id = t.id
    `);

    res.json(rows);
  } catch (err) {
    console.error("Error al obtener futbolista:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
}

// Insertar un nuevo futbolista
// Insertar un nuevo futbolista con validación
export async function insertarFutbolista(req, res, next) {
    try {
      // Verificar que el body no esté vacío
      if (!body) {
        return res.status(400).json({ error: "No se recibieron datos" });
      }

      let data;
      try {
        data = JSON.parse(body);
      } catch (err) {
        return res.status(400).json({ error: "Formato JSON inválido" });
      }

      const { name, nationality, position, age } = data;

      // Validaciones básicas
      if (!name || typeof name !== "string" || name.trim() === "") {
        return next(new Error("Esto es un mensaje de error"));
      }
      if (!nationality || typeof nationality !== "string" || nationality.trim() === "") {
        return res.status(400).json({ error: "La nacionalidad es obligatoria y debe ser un texto" });
      }
      if (!position || typeof position !== "string" || position.trim() === "") {
        return res.status(400).json({ error: "La posición es obligatoria y debe ser un texto" });
      }
      if (!age || isNaN(age) || age <= 0) {
        return res.status(400).json({ error: "La edad es obligatoria y debe ser un número mayor a 0" });
      }

      // Insertamos en la tabla players
      const [result] = await pool.query(
        "INSERT INTO players (name, nationality, position, age) VALUES (?, ?, ?, ?)",
        [name.trim(), nationality.trim(), position.trim(), age]
      );

      res.status(201).json({
        id: result.insertId,
        name: name.trim(),
        nationality: nationality.trim(),
        position: position.trim(),
        age
      });

    } catch (err) {
      next(new Error("Esto es un mensaje de error"));
    }
}



// Obtener un futbolista por ID con validación
export async function obtenerFutbolistaPorId(req, res) {
  try {
    const { id } = req.params;

    // Validar que id sea un número entero positivo
    const numId = Number(id);

    if (!Number.isInteger(numId) || numId <= 0) {
      return res.status(400).json({ error: "El ID debe ser un número entero positivo" });
    }

    const [rows] = await pool.query("SELECT * FROM players WHERE id = ?", [numId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Futbolista no encontrado" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error al obtener futbolista por id:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
}
