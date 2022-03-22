import { Negociacoes } from '../domain/negociacao/Negociacoes.js'
import { NegociacoesView } from '../ui/views/NegociacoesView.js'
import { Mensagem } from '../ui/models/Mensagem.js'
import { MensagemView } from '../ui/views/MensagemView.js'
import { NegociacaoService } from '../domain/negociacao/NegociacaoService.js'
import { getNegociacaoDao } from '../util/DaoFactory.js';
import { DataInvalidaException } from '../ui/converters/DataInvalidaException.js'
import { Negociacao } from '../domain/negociacao/Negociacao.js'
import { Bind } from '../util/Bind.js'
import { DateConverter } from '../ui/converters/DateConverter.js'

export class NegociacaoController {
    constructor () {
        const $ = document.querySelector.bind(document)
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')

        // NEGOCIACOES
        this._negociacoes = new Bind(
            new Negociacoes(),
            new NegociacoesView('#negociacoes'),
            'adiciona', 'esvazia'
        )

        // MENSAGEM
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView('#mensagem'),
            'texto'
        )

        this._service = new NegociacaoService()
        this._init()
    }

    _init() {
        getNegociacaoDao()
            .then(dao => dao.lista())
            .then(negociacoes => {
                negociacoes.forEach(
                    negociacao => this._negociacoes.adiciona(negociacao)
                )
            })
            .catch(error => this._mensagem.texto = error)
    }

    adiciona (event) {
        try {
            event.preventDefault()
            const negociacao = this._criaNegociacao()

            getNegociacaoDao()
                .then(dao => dao.adiciona(negociacao))
                .then(() => {
                    this._negociacoes.adiciona(negociacao)
                    this._mensagem.texto = 'Negociação adicionada com sucesso'
                    this._limpaFormulario()
                })
                .catch(error => this._mensagem.texto = error)

        } catch (error) {
            console.error(error.message)
            console.error(error.stack)

            if (error instanceof DataInvalidaException ) {
                this._mensagem.texto = error.message
            } else {
                this._mensagem.texto = 'Um erro não esperado aconteceu. Entre em contato com o suporte'
            }
        }
    }

    esvazia () {
        getNegociacaoDao()
            .then(dao => dao.apagaTodas())
            .then(() => {
                this._negociacoes.esvazia()
                this._mensagem.texto = 'Negociações apagadas com sucesso'
            })
            .catch(error => this._mensagem.texto = error)
    }

    importaNegociacoes () {
        this._service.obtemNegociacoesDoPeriodo()
            .then(negociacoes => {
                negociacoes
                    .filter(negociacaoParaAdicionar => {
                        const foiImportada = this._negociacoes.lista()
                            .some(negociacaoJaAdicionada => {
                                return negociacaoJaAdicionada.equals(negociacaoParaAdicionar)
                            })
                        return !foiImportada
                    })
                    .forEach(negociacao =>
                        this._negociacoes.adiciona(negociacao)
                    )
                this._mensagem.texto = 'Negociações importadas com sucesso'
            })
            .catch(error => this._mensagem.texto = error)
    }

    _criaNegociacao () {
        return new Negociacao(
            DateConverter.paraData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        )
    }

    _limpaFormulario () {
        this._inputData.value = ''
        this._inputQuantidade.value = 1
        this._inputValor.value = 100
        this._inputData.focus()
    }
}
