const fetchDataButton = document.getElementById('fetch-data');
const countryInfoDiv = document.getElementById('country-info');
const countryInfoDiv2 = document.getElementById('nepali-info');
fetchDataButton.addEventListener('click', () => {
  // Make a GET request to the REST Countries API
  fetch('https://restcountries.com/v3.1/name/nepal')
    .then(response => response.json())
    .then(data => {
      // Display the data in the countryInfoDiv
      countryInfoDiv.innerHTML = `
        <h2>${data[0].name.common}</h2>
        <h2>${data[0].name.official}</h2>
        <p>Capital: ${data[0].capital}</p>
        <p>Population: ${data[0].population}</p>
        <p>Region: ${data[0].region}</p>
        <p>Nepali Name: ${data[0].name.nativeName.nep.common}

      `;
      countryInfoDiv2.innerHTML = `<p>Nepali Name: ${data[0].name.nativeName.nep.common}`
    })
    .catch(error => console.error(error));
});
