import express from 'express'
const app = express()
const PORT = 3000

let frutas = ["Manzana", "Pera", "Uva", "Sandia", "Naranja", "Limon"]

app.get('/', (req, res) => {
    res.send(frutas.join(", "));
});

app.post('/', (req, res) => {
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

app.put('/:original/:nueva', (req, res) => {

    const original = req.params.original; // lo que venga en la URL
    const nueva = req.params.nueva;
    let posicion = frutas.indexOf(original); //obtenemos la posicion
    if (posicion !== -1) {
        frutas.splice(posicion, 1, nueva); //editamos la posicion
        res.status(201).send(`Se edito correctamente ${original} por ${nueva}`);
    }else{
        res.status(404).send(`No se encontro la fruta ${original}`);
    }

});

app.delete('/:fruta', (req, res) => {
    const original = req.params.fruta;
    let posicion = frutas.indexOf(original);
    if(posicion !== -1){
        frutas.splice(posicion, 1);
          res.status(201).send(`Se elimino la fruta ${original}`);
    }else{
        res.status(404).send(`No se encontro la fruta ${original}`);
    }
});


app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
});