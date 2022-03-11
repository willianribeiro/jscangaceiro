class NegociacaoController {
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
    }

    adiciona (event) {
        try {
            event.preventDefault()
            this._negociacoes.adiciona(this._criaNegociacao())
            this._mensagem.texto = 'Negociação adicionada com sucesso'
            this._limpaFormulario()
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
        this._negociacoes.esvazia()
        this._mensagem.texto = 'Negociações apagadas com sucesso'
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
