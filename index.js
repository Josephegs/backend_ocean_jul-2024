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

// Read All - (endpoint) [GET] /item
app.get('/item', function (req, res) {
    // Pega a lista e retorna como resposta do /item (no HTTP)
    res.send(lista)
})

// Sinalizar p/ o Express qual o formato da requisição usar (JSON)
app.use(express.json())

// Create - [POST] /item
app.post('/item', function (req, res) {
    // Obtem o nome da requisição
    const item = req.body.nome

    // Inserir o item no final da lista
    lista.push(item)

    //Envia uma mensagem de sucesso
    res.send ('Intem criado com sucesso!')
})

app.listen(3000)
