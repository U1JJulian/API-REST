import express from 'express'
import routerFrutas from './rutas/frutas.js'
const app = express()
const PORT = 3000

app.use('/frutas', routerFrutas);

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
});