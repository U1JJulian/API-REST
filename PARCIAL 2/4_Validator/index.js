import express from 'express'
import R_frutas from './rutas/frutas.js'
import R_usuario from './rutas/usuario.js'
import cors from 'cors'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'
import errorHandler from './middleware/errorHandler.js' // 👈 importación

//Definimos rutas
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//Creamos la carpeta a almacenar archivos
const folder = path.join(__dirname, '/archivos/');
const upload = multer({dest:folder});

//Definimos express y el puerto
const app = express()
const PORT = 3000

// Creamos el stream para logs
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs/access.log'),
  { flags: 'a' }
)

//Middlewares
app.use(cors())
app.use(morgan('combined', { stream: accessLogStream }))

//Multer
app.use(upload.single('archivo'));

//Rutas
app.use('/usuario', R_usuario)
app.use('/frutas', R_frutas)

//Manejador de errores
app.use(errorHandler)

// Servidor
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
