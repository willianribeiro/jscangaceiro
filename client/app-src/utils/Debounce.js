export function debounce (func, milissegundos) {
    let timer = 0

    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => func(), milissegundos)
    }
}
