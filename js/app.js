const host = 'api.frankfurter.app'
const select = document.querySelectorAll('select')
const button = document.querySelector('#btn')
const input = document.querySelector('#input')
const result = document.querySelector('#result')


window.onload = async () => {
    const response = await fetch(`https://${host}/currencies`)
    const data = await response.json()
    return display(data)

}

function display(data) {
    const entries = Object.entries(data)
    for (let i = 0; i < entries.length; i++) {
        select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`
        select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`
    }
}


button.addEventListener('click', _ => {
    let amount = input.value
    let fromCurrency = select[0].value
    let toCurrency = select[1].value

    if (fromCurrency !== toCurrency) {
        convertCurrency(fromCurrency, toCurrency, amount)
    } else if (!amount) {
        alert('Please enter an amount to convert.')
    } else {
        alert('Please select different currencies!')
    }
})


const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    const response = await fetch(`https://${host}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
    const data = await response.json()
    // console.log(Object.values(data.rates)[0])
    result.value = Object.values(data.rates)[0]
}