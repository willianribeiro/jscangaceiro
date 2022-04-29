import { NegociacaoController } from './controllers/NegociacaoController.js'
import { Negociacao } from './domain/index.js'

const controller = new NegociacaoController()
const $ = document.querySelector.bind(document)

$('.form')
    .addEventListener('submit', controller.adiciona.bind(controller))

$('#botao-apaga')
    .addEventListener('click', controller.esvazia.bind(controller))

$('#botao-importa')
    .addEventListener('click', controller.importaNegociacoes.bind(controller))


// CÓDIGO DE TESTE
// FAZ UM POST NA API
const negociacao = new Negociacao(new Date(), 10, 100.5)

const method = 'POST'
const body = negociacao.toJson()
debugger
const headers = new Headers()
headers.set('Content-Type', 'application/json')

const config = {
    method,
    headers,
    body
}

fetch('/negociacoes', config)
    .then(() => console.log('Dado enviado com sucesso'))
