document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'YOUR_TELEPORT_API_KEY';
    const searchButton = document.getElementById('searchButton');
    const cityInput = document.getElementById('cityInput');
    const result = document.getElementById('result');

    searchButton.addEventListener('click', function() {
        const cityName = cityInput.value;
        if (cityName) {
            searchCity(cityName);
        } else {
            result.innerHTML = 'Enter City';
        }
    });

    function searchCity(cityName) {
        fetch(`https://api.teleport.org/api/cities/?search=${cityName}`)
            .then(response => response.json())
            .then(data => {
                // Process the city score data from the Teleport API
                const cityScore = data;
                displayCityScore(cityScore);
            })
            .catch(error => {
                result.innerHTML = 'No Found.';
            });
    }

    function displayCityScore(cityScore) {
        // Display city score information on the page
        result.innerHTML = `
            <h2>${cityScore.name} (${cityScore.teleport_city})</h2>
            <p>Descrizione: ${cityScore.summary}</p>
            <h3>Categorie di punteggio:</h3>
            <ul>
                <li>Costo della vita: ${cityScore.categories['Cost of Living'].score}</li>
                <li>Clima: ${cityScore.categories['Weather'].score}</li>
                <!-- Aggiungi altre categorie e punteggi desiderati qui -->
            </ul>
        `;
    }
});
