export function guardarArchivo (req,res){
    console.log(`Se recibio el archivo: ${req.file.originalname}`);
    console.log(req.body);
    console.log('Se recibio el formulario:' + JSON.stringify(req.body));
    res.json(req.body);
}