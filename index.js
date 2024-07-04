const express = require('express')
const app = express()

app.get('/', function (req, res){
    res.send('Hello World')
})

// Desafio sugerido - criar um endpoint /oi que exibe "Olá, mundo!"
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

    // Envia uma mensagem de sucesso
    res.send ('Intem criado com sucesso!')
})

// Read By Id - [GET] /item/:id
app.get('/item/:id', function (req, res) {
    // Acessar o parâmetro de rota ID (/item/"123")
    const id = req.params.id

    // Acessar o item na lista pelo índice corrigo (id - 1)
    const item = lista[id - 1]
    
    // Envia o item obtido como resposta
    res.send(item)
})

// Update - [PUT] /item/:id
app.put('/item/:id', function (req, res) {
    // Acessa o ID do parâmetro de rota
    const id = req.params.id

    // Acessamos o body da requisição, com os dados
    // a serem atualizados
    const novoItem = req.body.nome

    // Atualiza o novo Item na lista, usando o índice
    lista[id - 1] = novoItem

    // Msg de sucesso
    res.send ('Item atualizado com sucesso: ' + id)
})

app.listen(3000)
