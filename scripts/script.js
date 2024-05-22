const inputField = document.querySelector(".inputCurrency input");
const currencyDropdown = document.querySelector(".inputCurrency select");

currencyDropdown.addEventListener("change", () => getBaseCurrency());

inputField.addEventListener("change", () => getValue());

document.querySelector(".inputCurrency").addEventListener("input", () => handleConversion());

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
        if (document.querySelector(".dashboard tr")) {
            document.querySelectorAll(".dashboard tr").forEach(function(value) {
                value.remove();
            })
        }
        for (const [key, value] of Object.entries(data.rates)) {
            let row = document.createElement("tr");
            let keyCell = document.createElement("td");
            let valueCell = document.createElement("td");

            keyCell.appendChild(document.createTextNode(key));
            valueCell.appendChild(document.createTextNode(value));

            row.appendChild(keyCell);
            row.appendChild(valueCell);
            document.querySelector(".dashboard table").appendChild(row);
        }
    });
}

const addButton = document.querySelector("#add");
