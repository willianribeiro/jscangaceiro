class DateConverter {
    static paraTexto(data) {
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
    }

    static paraData(texto) {
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(texto)) {
            throw new DataInvalidaException()
        }

        return new Date(texto.replace(/-/g, ','))
    }
}
