class NegociacaoService {
    obterNegociacoesDaSemana(callback) {
        const xhr = new XMLHttpRequest()

        xhr.open('GET', '/negociacoes/semana')

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const negociacoes = JSON
                        .parse(xhr.responseText)
                        .map(negociacao => new Negociacao(
                            new Date(negociacao.data),
                            negociacao.quantidade,
                            negociacao.valor
                        ))
                    callback(null, negociacoes)
                } else {
                    callback('Não foi possível obter nas negociações da semana', null)
                }
            }
        }

        xhr.send()
    }
}
