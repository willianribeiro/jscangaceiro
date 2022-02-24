class Negociacoes {
    constructor () {
        this._negociacoes = []
    }

    adiciona (negociacao) {
        this._negociacoes.push(negociacao)
    }

    lista () {
        return [].concat(this._negociacoes)
    }
}
