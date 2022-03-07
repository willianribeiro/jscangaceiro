class NegociacaoController {
    constructor () {
        const $ = document.querySelector.bind(document)
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')
        const self = this

        // NEGOCIACOES
        this._negociacoes = new Proxy(new Negociacoes(), {
            get(target, prop, receiver) {
                if (typeof(target[prop]) === 'function' && ['adiciona', 'esvazia'].includes(prop)) {
                    return function () {
                        console.log(`"${prop}" disparou a armadilha`);
                        target[prop].apply(target, arguments)
                        self._negociacoesView.update(target)
                    }
                }
                return target[prop]
            }
        })
        this._negociacoesView = new NegociacoesView('#negociacoes')
        this._negociacoesView.update(this._negociacoes)

        // MENSAGEM
        this._mensagem = new Proxy(new Mensagem(), {
            set (target, prop, value, receiver) {
                if (prop === 'texto') {
                    target.texto  = value
                    self._mensagemView.update(target)
                    return target.texto  === value
                }
                return Reflect.set(target, prop, value)
            }
        })
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
