import express from 'express'
const router = express.Router();


let frutas = ["Manzana", "Pera", "Uva", "Sandia", "Naranja", "Limon"]

const verificarJSON = () => {
    return (req, res, next) => {
        if (req.headers['content-type'] !== 'application/json, "Accept": "application/json"') {
            res.status(400).send('Servidor solo acepta Json')
        }
        else {
            next()
        }
    }
}

router.get('/', (req, res) => {
    res.send(frutas.join(", "));
});

router.post('/',verificarJSON(), (req, res) => {
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

export default router; 