import express from 'express'
const router = express.Router();
import { obtenerFrutas, insertarFruta } from '../controller/frutasController.js';
import { validarFruta } from "../middleware/validator.js";

router.get('/', (req, res) => {
    obtenerFrutas(req,res);
});

router.post('/',validarFruta, (req, res,next) => {
    insertarFruta(req,res,next);
});

export default router; 