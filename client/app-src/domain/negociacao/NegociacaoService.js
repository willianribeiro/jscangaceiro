import { HttpService } from '../../utils/HttpService.js'
import { Negociacao } from './Negociacao.js'

export class NegociacaoService {
    constructor() {
        this._http = new HttpService()
    }

    async obterNegociacoesDaSemana () {
        try {
            const negociacoes = await this._http.get('/negociacoes/semana')
            return negociacoes.map(negociacao => new Negociacao(
                new Date(negociacao.data),
                negociacao.quantidade,
                negociacao.valor
            ))
        } catch (error) {
            console.error(error)
            throw new Error('Não foi possível obter as negociações da semana')
        }
    }

    async obtemNegociacoesDaSemanaPassada () {
        try {
            const negociacoes = await this._http.get('/negociacoes/anterior')
            return negociacoes.map(negociacao => new Negociacao(
                new Date(negociacao.data),
                negociacao.quantidade,
                negociacao.valor
            ))
        } catch (error) {
            console.error(error)
            throw new Error('Não foi possível obter as negociações da semana passada')
        }
    }

    async obtemNegociacoesDaSemanaRetrasada () {
        try {
            const negociacoes = await this._http.get('/negociacoes/retrasada')
            return negociacoes.map(negociacao => new Negociacao(
                new Date(negociacao.data),
                negociacao.quantidade,
                negociacao.valor
            ))
        } catch (error) {
            console.error(error)
            throw new Error('Não foi possível obter as negociações da semana retrasada')
        }
    }

    async obtemNegociacoesDoPeriodo () {
        try {
            const responses = await Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obtemNegociacoesDaSemanaPassada(),
                this.obtemNegociacoesDaSemanaRetrasada()
            ])

            return responses
                .reduce((todasNegociacoes, negociacoesPeriodo) =>  (
                    todasNegociacoes.concat(negociacoesPeriodo)
                ), [])
                .sort((negociacao1, negociacao2) => {
                    return negociacao2.data.getTime() - negociacao1.data.getTime()
                })
        } catch (error) {
            console.error(error);
            throw new Error('Não foi possível obter as negociações do período')
        }
    }
}
