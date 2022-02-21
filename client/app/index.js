const campos = [
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor'),
]
console.log(campos)

const tbody = document.querySelector('table tbody')

document.querySelector('.form').addEventListener('submit', event => {
    event.preventDefault()

    const tr = document.createElement('tr')

    campos.forEach(campo => {
        const td = document.createElement('td')
        td.textContent = campo.value
        tr.appendChild(td)
    })

    const tdVolume = document.createElement('td')
    tdVolume.textContent = campos[1].value * campos[2].value

    tr.appendChild(tdVolume)
    tbody.appendChild(tr)
})