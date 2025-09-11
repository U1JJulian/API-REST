let frutas = ["Manzana", "Pera", "Uva", "Sandia", "Naranja", "Limon"]

export function obtenerFrutas(req,res){
        res.send(frutas.join(", "));
}

export function insertarFruta(req,res){
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
}