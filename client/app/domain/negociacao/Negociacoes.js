class Negociacoes {
    constructor (armadilha) {
        this._negociacoes = []
        this._armadilha = armadilha
        Object.freeze(this)
    }

    adiciona (negociacao) {
        this._negociacoes.push(negociacao)
        this._armadilha(this)
    }

    esvazia () {
        this._negociacoes.length = 0
        this._armadilha(this)
    }

    lista () {
        return [].concat(this._negociacoes)
    }

    get volumeTotal () {
        return this._negociacoes
            .reduce((total, negociacao) => total + negociacao.volume, 0)
    }
}
