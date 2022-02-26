class NegociacoesView {
    constructor (seletor) {
        this._elemento = document.querySelector(seletor)
    }

    update (model) {
        this._elemento.innerHTML = this.template(model)
    }

    template (model) {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>

                <tbody>
                    ${model.lista().map(item => `
                        <tr>
                            <td>${DateConverter.paraTexto(item.data)}</td>
                            <td>${item.quantidade}</td>
                            <td>${item.valor}</td>
                            <td>${item.volume}</td>
                        </tr>
                    `).join('')}
                </tbody>

                <tfoot>
                    <tr>
                        <td colspan="3"></td>
                        <td>${model.volumeTotal}</td>
                    </tr>
                </tfoot>
            </table>
        `
    }
}
