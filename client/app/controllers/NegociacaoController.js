class NegociacaoController {
    constructor () {
        const $ = document.querySelector.bind(document)
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')
    }

    adicionar (event) {
        event.preventDefault()
        const data = new Date(this._inputData.value.replace(/-/g, ','))
        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        )
        console.log(negociacao)
    }
}
