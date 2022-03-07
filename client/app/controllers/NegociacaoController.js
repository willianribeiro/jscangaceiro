class NegociacaoController {
    constructor () {
        const $ = document.querySelector.bind(document)
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')

        // NEGOCIACOES
        this._negociacoes = ProxyFactory.create(
            new Negociacoes(),
            new NegociacoesView('#negociacoes'),
            ['adiciona', 'esvazia']
        )

        // MENSAGEM
        this._mensagem = ProxyFactory.create(
            new Mensagem(),
            new MensagemView('#mensagem'),
            ['texto']
        )
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
