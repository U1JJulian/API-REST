import express from 'express'
const router = express.Router();
import { guardarArchivo } from '../controller/usuarioController.js';


router.post('/', (req, res) => {
    guardarArchivo(req,res);
});

export default router; 