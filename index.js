const express = require('express')
const app = express()

app.get('/', function (req, res){
    res.send('Hello World')
})

//Desafio sugerido - criar um endpoint /oi que exibe "Olá, mundo!"
app.get('/oi', function (req, res){
    res.send('Olá, mundo!')
})

// LISTA DE PERSONAGENS
const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']

// Read All - (endpoint)[GET] /item

app.get('/item', function (req, res) {
    res.send(lista)
})
app.listen(3000)
