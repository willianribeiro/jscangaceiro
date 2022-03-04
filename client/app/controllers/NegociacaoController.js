class NegociacaoController {
    constructor () {
        const $ = document.querySelector.bind(document)
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')
        this._negociacoes = new Negociacoes(model => { this._negociacoesView.update(model) })
        this._negociacoesView = new NegociacoesView('#negociacoes')
        this._negociacoesView.update(this._negociacoes)
        this._mensagem = new Mensagem('', model => { this._mensagemView.update(model) })
        this._mensagemView = new MensagemView('#mensagem')
        this._mensagemView.update(this._mensagem)
    }

    adiciona (event) {
        event.preventDefault()
        this._negociacoes.adiciona(this._criaNegociacao())
        this._mensagem.texto = 'Negociação adicionada com sucesso'
        this._limpaFormulario()
    }

    esvazia () {
        this._negociacoes.esvazia()
        this._mensagem.texto = 'Negociações apagadas com sucesso'
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
