document.getElementById("checkButton").addEventListener("click", function() {
  const date = document.getElementById("date").value;
  const currency1 = document.getElementById("startCurrency").value;
  const currency2 = document.getElementById("endCurrency").value; 
  const apiUrl = `https://api.frankfurter.app/${date}?from=${currency1}&to=${currency2}`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (currency1 === currency2) {
        throw new Error('Currencies cannot be the same');
      }
      const selectedDate = new Date(date);
      const limitDate = new Date('1999-01-04');
      if (selectedDate < limitDate) {
        throw new Error('Date cannot be before January 4, 1999');
      }
      const rate = data.rates[currency2]; 
      const formattedDate = selectedDate.toDateString();
      const resultElement = document.getElementById("result");
      resultElement.textContent = `On ${formattedDate}, 1 ${currency1} was equal to ${rate} ${currency2}.`;
    })
    .catch(error => {
      const resultElement = document.getElementById("result");
      if (error.message === 'Currencies cannot be the same') {
        console.error('Error:', error.message);
        resultElement.textContent = 'Currencies cannot be the same. Please select two different currencies.';
      } else if (error.message === 'Date cannot be before January 4, 1999') {
        console.error('Error:', error.message);
        resultElement.textContent = 'Date cannot be before January 4, 1999. Please select a new date.';
      } else {
        console.error('Error fetching data:', error);
        resultElement.textContent = 'An error occurred. Please try again.';
      }
    });
});