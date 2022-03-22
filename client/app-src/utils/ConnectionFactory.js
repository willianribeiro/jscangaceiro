let connection = null
let originalClose = null
const stores = ['negociacoes']

export class ConnectionFactory {
    constructor () {
        throw new Error('Não é possível criar instâncias dessa classe. Use os métodos estáticos.')
    }

    static getConnection (database='jscangaceiro', version=2) {
        return new Promise((resolve, reject) => {
            if (connection) return resolve(connection)

            const openRequest = indexedDB.open(database, version)

            openRequest.onupgradeneeded = event => {
                ConnectionFactory._createStores(event.target.result)
            }

            openRequest.onsuccess = event => {
                connection = event.target.result
                originalClose = connection.close.bind(connection)
                connection.close = () => {
                    throw new Error('Você não pode fechar diretamente a conexão. Use o método ConnectionFactory.closeConnection()')
                }
                resolve(connection)
            }

            openRequest.onerror = event => {
                console.error(e.target.error)
                reject(event.target.result)
            }
        })
    }

    static closeConnection () {
        if (connection)
            originalClose()
    }

    static _createStores (connection) {
        stores.forEach(store => {
            if (connection.objectStoreNames.contains(store))
                connection.deleteObjectStore(store)

            connection.createObjectStore(store, { autoIncrement: true })
        })
    }
}
