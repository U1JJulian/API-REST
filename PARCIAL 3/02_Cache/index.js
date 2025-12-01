import express from "express";
import apicache from "apicache";

const app = express();
const cache = apicache.middleware;

app.get("/api", cache("0.10 minutes"), (req, res) => {
    let numero = Math.random();
    console.log(numero);

    res.json({ num: numero });
});

app.listen(3000, () => {
    console.log("Servidor escuchando en puerto 3000");
});
