document.getElementById("checkButton").addEventListener("click", function() {
    const date = document.getElementById("date").value;
    const currency1 = document.getElementById("startCurrency").value;
    const currency2 = document.getElementById("endCurrency").value; 
    const apiUrl = `https://api.frankfurter.app/${date}?from=${currency1}&to=${currency2}`;
    
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const rate = data.rates[currency2];
        const formattedDate = new Date(date).toDateString();
        const resultElement = document.getElementById("result");
        resultElement.textContent = `On ${formattedDate}, 1 ${currency1} was equal to ${rate} ${currency2}.`;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        const resultElement = document.getElementById("result");
        resultElement.textContent = 'An error occurred. Please try again.';
      });
  });