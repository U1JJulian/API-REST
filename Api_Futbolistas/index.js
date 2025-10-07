import express from 'express'
import R_futbolista from './rutas/futbolista.js'
import errorHandler from './middleware/errorHandler.js' //importación

//Definimos express y el puerto
const app = express()
const PORT = 3000

//Rutas
app.use('/futbolista', R_futbolista)

//Manejador de errores
app.use(errorHandler)

// Servidor
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
