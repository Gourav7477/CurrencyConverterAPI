const currencies = [
    "USD","INR","EUR","GBP","JPY","AUD","CAD","CHF","CNY","SGD",
    "NZD","HKD","KRW","SEK","NOK","DKK","RUB","ZAR","BRL","MXN"
];

// Populate dropdowns
function loadCurrencies() {
    let from = document.getElementById("from");
    let to = document.getElementById("to");

    currencies.forEach(currency => {
        let option1 = document.createElement("option");
        option1.value = currency;
        option1.text = currency;
        from.appendChild(option1);

        let option2 = document.createElement("option");
        option2.value = currency;
        option2.text = currency;
        to.appendChild(option2);
    });

    from.value = "USD";
    to.value = "INR";
}

// Convert currency
async function convertCurrency() {
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;
    let amount = document.getElementById("amount").value;

    if (!amount || amount <= 0) {
        document.getElementById("result").value = "Enter valid amount";
        return;
    }

    try {
        let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        let data = await response.json();

        let rate = data.rates[to];

        let result = amount * rate;

        document.getElementById("result").value = result.toFixed(2);

        document.getElementById("rate").innerText =
            `1 ${from} = ${rate} ${to}`;

    } catch {
        document.getElementById("result").value = "API Error";
    }
}

// Swap
function swapCurrencies() {
    let from = document.getElementById("from");
    let to = document.getElementById("to");

    let temp = from.value;
    from.value = to.value;
    to.value = temp;

    convertCurrency();
}

// Load everything
window.onload = function () {
    loadCurrencies();
    convertCurrency();
};