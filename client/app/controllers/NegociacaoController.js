class NegociacaoController {
    constructor () {
        const $ = document.querySelector.bind(document)
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')
    }

    adicionar (event) {
        event.preventDefault()

        const negociacao = new Negociacao(
            DateConverter.paraData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        )

        console.log(DateConverter.paraTexto(negociacao.data))
    }
}
