import { HttpService } from '../../utils/HttpService.js'
import { Negociacao } from './Negociacao.js'

export class NegociacaoService {
    constructor() {
        this._http = new HttpService()
    }

    obterNegociacoesDaSemana() {
        return this._http.get('/negociacoes/semana')
            .then(
                negociacoes => {
                    return negociacoes
                        .map(negociacao => new Negociacao(
                            new Date(negociacao.data),
                            negociacao.quantidade,
                            negociacao.valor
                        ))
                },
                error => {
                    console.error(error)
                    throw new Error('Não foi possível obter as negociações da semana')
                }
            )
    }

    obtemNegociacoesDaSemanaPassada() {
        return this._http.get('/negociacoes/anterior')
            .then(
                negociacoes => {
                    return negociacoes
                        .map(negociacao => new Negociacao(
                            new Date(negociacao.data),
                            negociacao.quantidade,
                            negociacao.valor
                        ))
                },
                error => {
                    console.error(error)
                    throw new Error('Não foi possível obter as negociações da semana passada')
                }
            )
    }

    obtemNegociacoesDaSemanaRetrasada() {
        return this._http.get('/negociacoes/retrasada')
            .then(
                negociacoes => {
                    return negociacoes
                        .map(negociacao => new Negociacao(
                            new Date(negociacao.data),
                            negociacao.quantidade,
                            negociacao.valor
                        ))
                },
                error => {
                    console.error(error)
                    throw new Error('Não foi possível obter as negociações da semana retrasada')
                }
            )
    }

    obtemNegociacoesDoPeriodo () {
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obtemNegociacoesDaSemanaPassada(),
            this.obtemNegociacoesDaSemanaRetrasada()
        ])
            .then(responses => {
                return responses
                    .reduce((todasNegociacoes, negociacoesPeriodo) =>  (
                        todasNegociacoes.concat(negociacoesPeriodo)
                    ), [])
                    .sort((negociacao1, negociacao2) => {
                        return negociacao2.data.getTime() - negociacao1.data.getTime()
                    })
            })
            .catch(err => {
                console.error(err);
                throw new Error('Não foi possível obter as negociações do período')
            })
    }
}
