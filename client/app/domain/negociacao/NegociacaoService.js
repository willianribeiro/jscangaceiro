class NegociacaoService {
    obterNegociacoesDaSemana() {
        return new Promise((resolve, reject) => {
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
                        resolve(negociacoes)
                    } else {
                        reject('Não foi possível obter nas negociações da semana')
                    }
                }
            }

            xhr.send()
        })
    }
}
