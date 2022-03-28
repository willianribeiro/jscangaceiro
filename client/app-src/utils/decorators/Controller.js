export function controller (...seletores) {
    const $ = document.querySelector.bind(document)
    const elementos = seletores.map(seletor => $(seletor))

    return function (constructor) {
        const construtorNovo = function () {
            return new constructor(...elementos)
        }
        // É preciso copiar o prototype para o caso de classes
        // que utilizam herança
        construtorNovo.prototype = constructor.prototype
        return construtorNovo
    }
}
