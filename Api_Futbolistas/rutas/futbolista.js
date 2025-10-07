import express from 'express'
const router = express.Router();
import { obtenerFutbolista, insertarFutbolista, obtenerFutbolistaPorId } from '../controller/futbolistaController.js';

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
    obtenerFutbolista(req,res);
});

router.get('/:id', (req, res) => {
    obtenerFutbolistaPorId(req,res);
});

router.post('/',verificarJSON(), (req, res,next) => {
    insertarFutbolista(req,res,next);
});



export default router; 