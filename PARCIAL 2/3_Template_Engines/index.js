import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/hola', (req, res) => {
  res.render('holamundo');
});

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
