class NegociacaoDao {
    constructor (connection) {
        this._connection = connection
    }

    adiciona (negociacao) {
        return new Promise((resolve, reject) => {
            const request = this._connection
                .transaction(['negociacoes'], 'readwrite')
                .objectStore('negociacoes')
                .add(negociacao)

            request.onsuccess = () => resolve()
            request.onerror = event => {
                console.error(event.target.error)
                reject('Não foi possível salvar a negociação no banco')
            }
        })
    }

    lista () {
        return new Promise((resolve, reject) => {
            const cursor = this._connection
                .transaction(['negociacoes'], 'readonly')
                .objectStore('negociacoes')
                .openCursor()

            const negociacoes = []

            cursor.onsuccess = event => {
                const negociacaoCursor = event.target.result

                if (negociacaoCursor) {
                    negociacoes.push(negociacaoCursor.value)
                    negociacaoCursor.continue()
                } else {
                    resolve(negociacoes)
                }
            }

            cursor.onerror = event => {
                console.error(event.target.error)
                reject('Não foi possível obter as negociações do banco')
            }
        })
    }
}