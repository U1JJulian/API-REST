import express from 'express'
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send('Hola mundo')
});

app.post('/', (req, res) => {
    let body = ''

    req.on('data', chunk => {
        body += chunk.toString()
    })

    req.on('end', () => {

        const data = JSON.parse(body)
        res.status(201).json(data)
    })
});

app.put('/', (req, res) => {
    res.send('Hola, hemos editado un dato!')
})

app.delete('/', (req, res) => {
    res.send('Hola, hemos eliminado un dato!')
})


app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
});