import express from 'express'
const router = express.Router();
import { obtenerFrutas, insertarFruta } from '../controller/frutasController.js';

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
    obtenerFrutas(req,res);
});

router.post('/',verificarJSON(), (req, res,next) => {
    insertarFruta(req,res,next);
});

export default router; 