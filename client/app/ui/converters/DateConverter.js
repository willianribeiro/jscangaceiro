class DateConverter {
    static paraTexto(data) {
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
    }

    static paraData(texto) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) {
            throw new Error('A data deve estar no formato aaaa-mm-dd')
        }

        return new Date(texto.replace(/-/g, ','))
    }
}