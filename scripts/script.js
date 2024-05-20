const inputField = document.querySelector(".inputCurrency input");
const currencyDropdown = document.querySelector(".inputCurrency select");

currencyDropdown.addEventListener("change", () => getBaseCurrency());

inputField.addEventListener("change", () => getValue());

document.addEventListener("change", () => handleConversion());

function getValue () {
    return inputField.value;
}

function getBaseCurrency () {
    return currencyDropdown.value;
}

function handleConversion() {
    const value = getValue();
    const baseCurrency = getBaseCurrency();
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${value}&from=${baseCurrency}`)
    .then(resp => resp.json())
    .then((data) => {
        document.querySelector("#USD + td").innerHTML = data.rates.USD ? data.rates.USD : "-";
        document.querySelector("#GBP + td").innerHTML = data.rates.GBP ? data.rates.GBP : "-";
    });
}