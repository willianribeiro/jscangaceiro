import { Negociacoes, NegociacaoService, Negociacao } from '../domain/index.js'
import { NegociacoesView, MensagemView, Mensagem, DateConverter } from '../ui/index.js'
import { getNegociacaoDao, Bind, getExceptionMessage, debounce, controller } from '../utils/index.js'

@controller('#data', '#quantidade', '#valor')
export class NegociacaoController {
    constructor (_inputData, _inputQuantidade, _inputValor) {
        Object.assign(this, {
            _inputData,
            _inputQuantidade,
            _inputValor
        })

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

    async _init() {
        try {
            const dao = await getNegociacaoDao()
            const negociacoes = await dao.lista()
            negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao))
        } catch (error) {
            this._mensagem.texto = getExceptionMessage(error)
        }
    }

    // @debounce()
    async adiciona (event) {
        try {
            event.preventDefault()
            const negociacao = this._criaNegociacao()
            const dao = await getNegociacaoDao()
            await dao.adiciona(negociacao)
            this._negociacoes.adiciona(negociacao)
            this._mensagem.texto = 'Negociação adicionada com sucesso'
            this._limpaFormulario()
        } catch (error) {
            this._mensagem.texto = getExceptionMessage(error)
        }
    }

    async esvazia () {
        try {
            const dao = await getNegociacaoDao()
            await dao.apagaTodas()
            this._negociacoes.esvazia()
            this._mensagem.texto = 'Negociações apagadas com sucesso'
        } catch(error) {
            this._mensagem.texto = getExceptionMessage(error)
        }
    }

    @debounce()
    async importaNegociacoes () {
        try {
            const negociacoes = await this._service.obtemNegociacoesDoPeriodo()
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
        } catch (error) {
            this._mensagem.texto = getExceptionMessage(error)
        }
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
