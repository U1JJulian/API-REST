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
export async function insertarFutbolista(req, res) {
  let body = "";

  req.on("data", chunk => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const data = JSON.parse(body);
      const { name, nationality, position, age } = data;

      // Insertamos en la tabla players
      const [result] = await pool.query(
        "INSERT INTO players (name, nationality, position, age) VALUES (?, ?, ?, ?)",
        [name, nationality, position, age]
      );

      res.json({
        id: result.insertId,
        name,
        nationality,
        position,
        age
      });

    } catch (err) {
      console.error("Error al insertar futbolista:", err);
      res.status(500).json({ error: "Error en el servidor" });
    }
  });
}

// Obtener un futbolista por ID
export async function obtenerFutbolistaPorId(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM players WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Futbolista no encontrado" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error al obtener futbolista por id:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
}