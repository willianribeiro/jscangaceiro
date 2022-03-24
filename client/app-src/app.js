import { NegociacaoController } from './controllers/NegociacaoController.js'
import { debounce  } from './utils/Debounce.js'

const controller = new NegociacaoController()
const $ = document.querySelector.bind(document)

$('.form')
    .addEventListener('submit', controller.adiciona.bind(controller))

$('#botao-apaga')
    .addEventListener('click', controller.esvazia.bind(controller))

$('#botao-importa')
    .addEventListener('click', debounce(controller.importaNegociacoes.bind(controller), 1000))
