import express from 'express'
import { swaggerDocs } from './config/swagger.js'

const app = express()
const PORT = 3000

let frutas = ["Manzana", "Pera", "Uva", "Sandia", "Naranja", "Limon"]

const verificarJSON = () => {
    return (req, res, next) => {
        if (req.headers['content-type'] !== 'application/json, "Accept": "application/json"') {
            res.status(400).send('Servidor solo acepta Json')
        } else {
            next()
        }
    }
}

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene todas las frutas
 *     responses:
 *       200:
 *         description: Lista de frutas separadas por coma
 */
app.get('/', (req, res) => {
    res.send(frutas.join(", "));
});

/**
 * @swagger
 * /:
 *   post:
 *     summary: Agrega una nueva fruta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fruta:
 *                 type: string
 *                 example: Mango
 *     responses:
 *       201:
 *         description: Fruta agregada correctamente
 *       400:
 *         description: El servidor solo acepta JSON
 */
app.post('/', verificarJSON(), (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const data = JSON.parse(body);
        frutas.push(`${data.fruta}`);

        const mensaje = {
            "mensaje": `Se agrego correctamente la fruta ${data.fruta}`
        }
        res.status(201).json(mensaje);
    });
});

/**
 * @swagger
 * /{original}/{nueva}:
 *   put:
 *     summary: Edita el nombre de una fruta
 *     parameters:
 *       - in: path
 *         name: original
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre actual de la fruta
 *       - in: path
 *         name: nueva
 *         schema:
 *           type: string
 *         required: true
 *         description: Nuevo nombre de la fruta
 *     responses:
 *       201:
 *         description: Fruta editada correctamente
 *       404:
 *         description: Fruta no encontrada
 */
app.put('/:original/:nueva', (req, res) => {
    const { original, nueva } = req.params;
    const posicion = frutas.indexOf(original);
    if (posicion !== -1) {
        frutas.splice(posicion, 1, nueva);
        res.status(201).send(`Se edito correctamente ${original} por ${nueva}`);
    } else {
        res.status(404).send(`No se encontro la fruta ${original}`);
    }
});

/**
 * @swagger
 * /{fruta}:
 *   delete:
 *     summary: Elimina una fruta
 *     parameters:
 *       - in: path
 *         name: fruta
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la fruta a eliminar
 *     responses:
 *       201:
 *         description: Fruta eliminada correctamente
 *       404:
 *         description: Fruta no encontrada
 */
app.delete('/:fruta', (req, res) => {
    const { fruta } = req.params;
    const posicion = frutas.indexOf(fruta);
    if (posicion !== -1) {
        frutas.splice(posicion, 1);
        res.status(201).send(`Se elimino la fruta ${fruta}`);
    } else {
        res.status(404).send(`No se encontro la fruta ${fruta}`);
    }
});

app.listen(PORT, () => {
    console.log(`✅ Servidor escuchando en: http://localhost:${PORT}`)
    swaggerDocs(app)
});
