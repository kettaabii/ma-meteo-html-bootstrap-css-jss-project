const apiKey = '517bee7165f36c269ad0336a4dcf4065'; // Replace with your actual API key
const cardsContainer = document.getElementById('cards');
const cities=["marrakech","agadir" ,"oued zem","casablanca" ]
const searchForm = document.getElementById('.searchbar');
const searchInput = document.getElementById("search_input");
const searchButton = document.getElementById("search-button");

const toggleButtons = document.querySelectorAll('.toggle-menu input[name="weather-time"]');
searchButton.addEventListener("click",async ()  => {
    const location = searchInput.value.toLowerCase();
   console.log(location);

    try {
        const weatherData = await fetchWeatherData(location);
console.log(weatherData);
        if (weatherData) {
            updateInfoBanner(weatherData);
            // Assuming updateInfoBanner handles all updates
        } else {
            // Handle search error (e.g., display an error message)
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Handle fetch error (e.g., display an error message)
    }
});


async function fetchWeatherData(location) {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=fr`);
        const weatherData = await res.json();
        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error);

    }
}


function generateCards() {
    cardsContainer.innerHTML = ''; // Clear existing cards

    cities.forEach(async (location) => {
        const weatherData = await fetchWeatherData(location);

        if (weatherData) {
            const card = document.createElement('div');
            card.classList.add('col-md-3');

            card.innerHTML = `
        <div id="cartetemp" class="card">
          <div class="card-body d-flex flex-sm-column">
            <h5 id="location" class="card-title">${weatherData.name}</h5>
            <h1 id="temperature">${weatherData.main.temp} °</h1>
            <p id="description">${weatherData.weather[0].main}</p>
            <div class="temp d-inline-flex  justify-content-between">
                        <p id="clouds" > ${weatherData.weather[0].description} </p>
                    </div>
                    <div class="temp d-inline-flex justify-content-between ">
                        <svg width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h9.11A1.89 1.89 0 0 0 16 6.11v0c0-1.615-1.894-2.486-3.12-1.435L12.5 5M3 12h14.902C19.06 12 20 12.94 20 14.098v0c0 2.152-2.853 2.91-3.92 1.041L16 15M5 16h6.11A1.89 1.89 0 0 1 13 17.89v0c0 1.615-1.894 2.486-3.12 1.435L9.5 19"></path> </g></svg>
                        <p id="wind" > ${weatherData.wind.speed} &nbsp KM/h</p>
                    </div>
                    <div class="temp d-inline-flex justify-content-between">
                        <svg width="40px" height="40px" fill="#ffffff" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> <style> .cls-1 { fill: none; } </style> </defs> <title>humidity</title> <path d="M23.4761,13.9932,16.8472,3.4365a1.04,1.04,0,0,0-1.6944,0L8.4941,14.0444A9.9861,9.9861,0,0,0,7,19a9,9,0,0,0,18,0A10.0632,10.0632,0,0,0,23.4761,13.9932ZM16,26.0005a7.0089,7.0089,0,0,1-7-7,7.978,7.978,0,0,1,1.2183-3.9438l.935-1.4888L21.2271,23.6411A6.9772,6.9772,0,0,1,16,26.0005Z"></path> <rect id="_Transparent_Rectangle_" data-name="<Transparent Rectangle>" class="cls-1" width="32" height="32"></rect> </g></svg>
                        <p id="humidity"> ${weatherData.main.humidity} &nbsp % </p>
                    </div>
          </div>
        </div>
      `;

            cardsContainer.appendChild(card);
        }
    });
}


const lastSearchedLocations = JSON.parse(localStorage.getItem('lastSearchedLocations')) || [];


generateCards(lastSearchedLocations);
function updateInfoBanner(weatherData) {

    // Mettre à jour le nom de la ville sélectionnée

    document.getElementById('selectedcity').textContent = weatherData.name;


    // Mettre à jour les informations sur la température
    document.getElementById('tempinfo').innerHTML = `
        <p>Min:     ${weatherData.main.temp_min} °C</p>
        <p>Max:      ${weatherData.main.temp_max} °C</p>
        <h1>${weatherData.main.temp} °C</h1>
    `;

    // Mettre à jour les informations sur la pression atmosphérique
    document.getElementById('preassure').innerHTML = `
        <svg fill="#000000" width="30px" height="30px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg">
            <path d="M22,30H10V25H6l10-9,10,9H22Z"></path>
            <path d="M16,16,6,7h4V2H22V7h4Z"></path>
            <rect id="_Transparent_Rectangle_" data-name="<Transparent Rectangle>" class="cls-1" width="32" height="32"></rect>
        </svg>
        <p>${weatherData.main.pressure} hPa</p>
    `;

    // Mettre à jour les informations sur la vitesse du vent
    document.getElementById('windSpeed').innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.7639 7C16.3132 6.38625 17.1115 6 18 6C19.6569 6 21 7.34315 21 9C21 10.6569 19.6569 12 18 12H3M8.50926 4.66667C8.87548 4.2575 9.40767 4 10 4C11.1046 4 12 4.89543 12 6C12 7.10457 11.1046 8 10 8H3M11.5093 19.3333C11.8755 19.7425 12.4077 20 13 20C14.1046 20 15 19.1046 15 18C15 16.8954 14.1046 16 13 16H3" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        <p>${weatherData.wind.speed} m/s</p>
    `;

    // Mettre à jour les informations sur la direction du vent
    document.getElementById('windDirection').innerHTML = `
        <svg viewBox="0 0 30 30" version="1.1" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" fill="#ffffff">
            <path d="M17.745,20.146l-2.832,2.832c-0.387,0.387-1.017,0.387-1.404,0s-0.387-1.017,0-1.404l2.541-2.541 c-1.564-0.667-3.274-1.1-5.074-1.1c-4.607,0-8.499,3.354-9.255,7.726c-0.091,0.568,0.332,1.102,0.901,1.194 c0.038,0.006,0.076,0.009,0.114,0.009c0.502,0,0.922-0.38,0.985-0.883c0.746-4.644,4.735-8.114,9.368-8.114 c1.629,0,3.184,0.395,4.567,1.14l2.741-2.741c0.387-0.387,1.017-0.387,1.404,0S18.132,19.759,17.745,20.146z"></path>
            <rect id="_Transparent_Rectangle_" data-name="<Transparent Rectangle>" class="cls-1" width="32" height="32"></rect>
        </svg>
        <p>${weatherData.wind.deg}°</p>
    `;

    // Mettre à jour les informations sur l'humidité
    document.getElementById('humidity1').innerHTML = `
        <svg fill="#ffffff" width="30px" height="30px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.4761,13.9932,16.8472,3.4365a1.04,1.04,0,0,0-1.6944,0L8.4941,14.0444A9.9861,9.9861,0,0,0,7,19a9,9,0,0,0,18,0A10.0632,10.0632,0,0,0,23.4761,13.9932ZM16,26.0005a7.0089,7.0089,0,0,1-7-7,7.978,7.978,0,0,1,1.2183-3.9438l.935-1.4888L21.2271,23.6411A6.9772,6.9772,0,0,1,16,26.0005Z"></path>
            <rect id="_Transparent_Rectangle_" data-name="<Transparent Rectangle>" class="cls-1" width="32" height="32"></rect>
        </svg>
        <p>${weatherData.main.humidity}%</p>
    `;

    // Mettre à jour les informations sur la visibilité
    document.getElementById('visibility').innerHTML = `
        <svg fill="#ffffff" height="30px" width="30px" viewBox="0 0 379.57 379.57" xmlns="http://www.w3.org/2000/svg">
            <path d="M320.962,123.055c-30.868-24.218-78.682-53.087-131.177-53.087c-52.263,0-100.19,29.226-131.192,53.744 C27.928,147.963,0,179.456,0,189.785c0,11.773,26.846,42.62,58.623,67.36c25.163,19.591,75.664,52.457,131.162,52.457 c55.526,0,106.01-32.82,131.161-52.384c31.778-24.719,58.625-55.599,58.625-67.433C379.57,178.732,352.183,147.55,320.962,123.055z M189.785,268.254c-43.337,0-78.468-35.132-78.468-78.468c0-43.337,35.131-78.468,78.468-78.468s78.468,35.131,78.468,78.468 C268.253,233.122,233.122,268.254,189.785,268.254z"></path>
        </svg>
        <p>${weatherData.visibility} m</p>
    `;

    // Mettre à jour les informations sur les précipitations
    document.getElementById('precipitation').innerHTML = `
        <svg fill="#ffffff" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5,6.3C13.5,5.4,12.8,3,12,3s-1.5,2.4-1.5,3.3S11.2,8,12,8S13.5,7.3,13.5,6.3z"></path>
            <path d="M10,13.3c0-0.9-0.7-3.3-1.5-3.3S7,12.4,7,13.3C7,14.3,7.7,15,8.5,15S10,14.3,10,13.3z"></path>
            <path d="M17,13.3c0-0.9-0.7-3.3-1.5-3.3c-0.8,0-1.5,2.4-1.5,3.3c0,0.9,0.7,1.7,1.5,1.7C16.3,15,17,14.3,17,13.3z"></path>
            <path d="M13.5,19.3c0-0.9-0.7-3.3-1.5-3.3s-1.5,2.4-1.5,3.3c0,0.9,0.7,1.7,1.5,1.7S13.5,20.3,13.5,19.3z"></path>
            <path d="M20,6.3C20,5.4,19.3,3,18.5,3S17,5.4,17,6.3S17.7,8,18.5,8S20,7.3,20,6.3z"></path>
            <path d="M7,6.3C7,5.4,6.3,3,5.5,3S4,5.4,4,6.3S4.7,8,5.5,8S7,7.3,7,6.3z"></path>
        </svg>
        <p>${weatherData.rain ? weatherData.rain['1h'] : '0'} mm/h</p>
    `;

    // Mettre à jour la description météorologique
    document.getElementById('4ndinfo').innerHTML = `
        
       
        <p>${weatherData.weather[0].description}</p>
    `;
    const sunriseTime = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();

    document.getElementById('sunrise').innerHTML = `<p> ${sunriseTime}</p>`;
    document.getElementById('sunset').innerHTML = `<p> ${sunsetTime}</p>`;}

// Appel de la fonction pour mettre à jour les données avec les données météorologiques récupérées
updateInfoBanner(fetchWeatherData(location));
////////////////////////////////////////////////*/////////
document.addEventListener("DOMContentLoaded", function(event) {

    updateTimeBasedOnCity(location);

});


    async function updateTimeBasedOnCity(location) {
        try {
            const weatherData = await fetchWeatherData(location);
            if (weatherData) {
                const timezoneOffset = weatherData.timezone; // Timezone offset in seconds

                // Create a Date object in the city's time zone
                const cityDate = new Date(new Date().getTime() + timezoneOffset * 1000);

                // Format the time string based on the city's time zone
                const timeString = cityDate.toLocaleTimeString([], { timeZone: weatherData.timezone });

                // Update the HTML elements with the formatted time string
                document.getElementById("h").innerText = timeString.split(":")[0];
                document.getElementById("m").innerText = timeString.split(":")[1];
                document.getElementById("s").innerText = timeString.split(":")[2].split(" ")[0];
                document.getElementById("ap").innerText = timeString.split(" ")[1];
            } else {
                // Handle missing weather data
                console.error('Missing weather data for city:', city);
                // You could display a message to the user or take other appropriate actions
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            // Handle fetch error (e.g., display an error message)
        }
    }

// Call the function initially and periodically
    updateTimeBasedOnCity(city); // Replace 'city' with the actual city name
    setInterval(() => updateTimeBasedOnCity(city), 1000);