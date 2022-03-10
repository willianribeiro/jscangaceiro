class NegociacaoService {
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
                    throw new Error('Não foi possível obter as negociações da semana')
                }
            )
    }
}
