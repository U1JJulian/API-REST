import express from 'express'
import routerFrutas from './rutas/frutas.js'
import cors from 'cors'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3000

// Creamos el stream para logs
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs/access.log'),
  { flags: 'a' }
)

// Middlewares
app.use(cors())
app.use(morgan('combined', { stream: accessLogStream }))

// Rutas
app.use('/frutas', routerFrutas)

// Servidor
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
