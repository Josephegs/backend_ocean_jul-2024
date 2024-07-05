const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const app = express()

// Conexão com o DB
const dbUrl = 'mongodb+srv://admin:mYT38WLxEyG9wXND@cluster0.8ejyt2v.mongodb.net'
const dbName = 'ocean-backend'

const client = new MongoClient(dbUrl)

async function main() {
    console.log('Conectando ao banco de dados...')
    await client.connect()
    console.log('Banco de dados conectado com sucesso')


    app.get('/', function (req, res) {
        res.send('Hello, World!')
    })

    // Desafio sugerido - criar um endpoint /oi que exibe "Olá, mundo!"
    app.get('/oi', function (req, res) {
        res.send('Olá, mundo!')
    })

    // LISTA DE PERSONAGENS
    const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']

    const db = client.db(dbName)
    const collection = db.collection('item')

    // Read All - (endpoint) [GET] /item
    app.get('/item', async function (req, res) {
        // Obter todos os documentos da collection
        const documentos = await collection.find().toArray()

        // Pega os documentos e retorna como resposta do /item (no HTTP)
        res.send(documentos)
    })

    // Sinalizar p/ o Express qual o formato da requisição usar (JSON)
    app.use(express.json())

    // Create - [POST] /item
    app.post('/item', async function (req, res) {
        // Obtem o objeto inteiro da requisição
        const item = req.body

        // Inserir o item na collection
        await collection.insertOne(item)

        // Exibe o item adicionado
        res.send(item)
    })

    // Read By Id - [GET] /item/:id
    app.get('/item/:id', async function (req, res) {
        // Acessar o parâmetro de rota ID (/item/"123")
        const id = req.params.id

        // Acessar o item na Collection pelo índice corrigo (id - 1)
        const item = await collection.findOne({ _id: new ObjectId(id)})
        // Envia o item obtido como resposta
        res.send(item)
    })

    // Update - [PUT] /item/:id
    app.put('/item/:id', async function (req, res) {
        // Acessa o ID do parâmetro de rota
        const id = req.params.id

        // Acessamos o body da requisição, com os dados
        // a serem atualizados
        const novoItem = req.body

        // Atualiza a collection com a nova informação
        await collection.updateOne(
            { _id: new ObjectId(id)},
            { $set: novoItem}
        )
        // Msg de sucesso
        res.send('Item atualizado com sucesso: ' + id)
    })

    // Delete [DELETE] /item/:id
    app.delete('/item/:id', async function (req, res){
        // Acessamos o ID do parâmetro de rota
        const id = req.params.id

        // Remove o item da collection pelo ObjectID
        await collection.deleteOne({ _id: new ObjectId (id)})

        //Envia mensagem de sucesso
        res.send('Item removido com sucesso')
        })

    app.listen(3000)
}

main()
