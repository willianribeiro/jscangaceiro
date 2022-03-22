export class Negociacao {
    constructor (_data, _quantidade, _valor) {
        // Negociacao precisa ser imutável
        this._data = new Date(_data.getTime())
        Object.assign(this, { _quantidade, _valor })
        Object.freeze(this)
    }

    get data () {
        return this._data
    }

    get quantidade () {
        return this._quantidade
    }

    get valor () {
        return this._valor
    }

    get volume () {
        return this._quantidade * this._valor
    }

    equals (negociacao) {
        return JSON.stringify(negociacao) === JSON.stringify(this)
    }
}
