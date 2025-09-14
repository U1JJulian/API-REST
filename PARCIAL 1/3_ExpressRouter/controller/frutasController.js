import { createPool } from "mysql2/promise";

// Crear el pool de conexiones
export const pool = createPool({
  host: "localhost",
  user: "root",       
  password: "admin",  
  database: "tienda", // aquí va tu base de datos
  port: 3306
});

// Obtener todas las frutas desde la BD
export async function obtenerFrutas(req, res) {
  try {
    const [rows] = await pool.query("SELECT nombre FROM frutas");
    const nombres = rows.map(f => f.nombre);
    res.json(nombres);
  } catch (err) {
    console.error("Error al obtener frutas:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
}

// Insertar una fruta en la BD
export async function insertarFruta(req, res) {
  let body = "";

  req.on("data", chunk => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const data = JSON.parse(body);

      // Insertar en la base de datos
      const [result] = await pool.query(
        "INSERT INTO frutas (nombre) VALUES (?)",
        [data.fruta]
      );

      const mensaje = {
        mensaje: `Se agregó correctamente la fruta ${data.fruta}`,
        id: result.insertId
      };

      res.status(201).json(mensaje);

    } catch (err) {
      console.error("Error al insertar fruta:", err);
      res.status(500).json({ error: "Error en el servidor" });
    }
  });
}
