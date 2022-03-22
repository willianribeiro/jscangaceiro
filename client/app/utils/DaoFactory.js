import { ConnectionFactory } from './ConnectionFactory.js'
import { NegociacaoDao } from '../domain/negociacao/NegociacaoDao.js'

export const getNegociacaoDao = () => {
    return ConnectionFactory.getConnection()
        .then(connection => new NegociacaoDao(connection))
}
