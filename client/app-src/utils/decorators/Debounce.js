export function debounce (milissegundos = 500) {
    return function (target, key, descriptor) {
        // descriptor: objeto especial que dá acesso a implementação original
        const originalFunction = descriptor.value
        let timer = 0

        descriptor.value = function (...args) {
            if (event) event.preventDefault()
            clearTimeout(timer)
            timer = setTimeout(() => originalFunction.apply(this, args), milissegundos)
        }

        return descriptor
    }
}
