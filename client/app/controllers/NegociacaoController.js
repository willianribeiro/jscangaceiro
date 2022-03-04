class NegociacaoController {
    constructor () {
        const $ = document.querySelector.bind(document)
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')
        this._negociacoes = new Negociacoes()
        this._negociacoesView = new NegociacoesView('#negociacoes')
        this._negociacoesView.update(this._negociacoes)
        this._mensagem = new Mensagem()
        this._mensagemView = new MensagemView('#mensagem')
    }

    adiciona (event) {
        event.preventDefault()
        const negociacao = this._criaNegociacao()
        this._negociacoes.adiciona(negociacao)
        this._negociacoesView.update(this._negociacoes)
        this._mensagem.texto = 'Negociação adicionada com sucesso'
        this._mensagemView.update(this._mensagem)
        this._limpaFormulario()
    }

    esvazia () {
        this._negociacoes.esvazia()
        this._negociacoesView.update(this._negociacoes)
        this._mensagem.texto = 'Negociações apagadas com sucesso'
        this._mensagemView.update(this._mensagem)
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
