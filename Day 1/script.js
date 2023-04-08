const form = document.getElementById('country-form');
const countryInput = document.getElementById('country-input');
const submitBtn = document.getElementById('submit-btn');
const countryInfo = document.getElementById('country-info');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  getCountryInfo(countryInput.value);
});

submitBtn.addEventListener('click', function(event) {
  event.preventDefault();
  getCountryInfo(countryInput.value);
});

function getCountryInfo(countryName) {
  fetch(`https://restcountries.com/v2/name/${countryName}?fullText=true`)
    .then(response => response.json())
    .then(data => {
      const country = data[0];
      const capital = country.capital;
      const population = country.population.toLocaleString();
      const currencies = country.currencies.map(currency => currency.name);
      const flag = country.flag;
      const latitude = country.latlng[0];
      const longitude = country.latlng[1];

      const countryInfoHTML = `
        <h2>${country.name}</h2>
        <img src="${flag}" alt="${country.name} flag" class="flag">
        <ul>
          <li><strong>Capital:</strong> ${capital}</li>
          <li><strong>Population:</strong> ${population}</li>
          <li><strong>Currencies:</strong></li>
          <ul class="currencies">
            ${currencies.map(currency => `<li class="currency">${currency}</li>`).join('')}
          </ul>
        </ul>
      `;

      countryInfo.innerHTML = countryInfoHTML;

      // Check if map container already exists and remove it
      const mapContainer = document.getElementById('map');
      if (mapContainer != null) {
        mapContainer.remove();
      }

      // Create new map instance
      const newMapContainer = document.createElement('div');
      newMapContainer.id = 'map';
      countryInfo.appendChild(newMapContainer);

      const map = L.map('map').setView([latitude, longitude], 3);
      const attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
      const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      const tiles = L.tileLayer(tileUrl, { attribution });
      tiles.addTo(map);
      const marker = L.marker([latitude, longitude]).addTo(map);
    })
    .catch(error => {
      countryInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}
