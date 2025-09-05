import express from 'express'
import routerFrutas from './rutas/frutas.js'
import cors from 'cors' //npm install cors
const app = express()
const PORT = 3000

//app.use(cors()) //agregamos cors a nuestra app

app.use('/frutas', routerFrutas);

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
});