class DaoFactory {
    constructor () {
        throw new Error('Essa classe não pode ser instanciada. Use os métodos estáticos.')
    }

    static getNegociacaoDao () {
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
    }
}
