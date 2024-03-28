const apiKey = '517bee7165f36c269ad0336a4dcf4065'; // Replace with your actual API key
const cardsContainer = document.getElementById('cards');
const cities=["marrakech","agadir" ,"oued zem","casablanca" ]
const searchForm = document.getElementById('.searchbar');

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
            <div class="temp d-inline-flex ">
                        <svg width="40px" height="40px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#FFAC33" d="M16 2s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2V2zm18 14s2 0 2 2s-2 2-2 2h-2s-2 0-2-2s2-2 2-2h2zM4 16s2 0 2 2s-2 2-2 2H2s-2 0-2-2s2-2 2-2h2zm5.121-8.707s1.414 1.414 0 2.828s-2.828 0-2.828 0L4.878 8.708s-1.414-1.414 0-2.829c1.415-1.414 2.829 0 2.829 0l1.414 1.414zm20.587 2.828s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zm-21 21s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414z"></path><circle fill="#FFAC33" cx="18" cy="18" r="10"></circle><path fill="#E1E8ED" d="M29.777 23.2c-.642 0-1.26.1-1.843.285c-.688-2.028-2.56-3.485-4.767-3.485c-2.368 0-4.35 1.678-4.899 3.937a3.407 3.407 0 0 0-2.101-.736c-1.933 0-3.5 1.611-3.5 3.6c0 .483.096.941.264 1.363A3.715 3.715 0 0 0 11.889 28C9.741 28 8 29.791 8 32s1.741 4 3.889 4h17.889C33.214 36 36 33.136 36 29.6c0-3.535-2.786-6.4-6.223-6.4z"></path></g></svg>
                        <p id="clouds" > ${weatherData.weather[0].main}} </p>
                    </div>
                    <div class="temp d-inline-flex ">
                        <svg width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h9.11A1.89 1.89 0 0 0 16 6.11v0c0-1.615-1.894-2.486-3.12-1.435L12.5 5M3 12h14.902C19.06 12 20 12.94 20 14.098v0c0 2.152-2.853 2.91-3.92 1.041L16 15M5 16h6.11A1.89 1.89 0 0 1 13 17.89v0c0 1.615-1.894 2.486-3.12 1.435L9.5 19"></path> </g></svg>
                        <p id="wind" > km/h </p>
                    </div>
                    <div class="temp d-inline-flex ">
                        <svg width="40px" height="40px" fill="#ffffff" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> <style> .cls-1 { fill: none; } </style> </defs> <title>humidity</title> <path d="M23.4761,13.9932,16.8472,3.4365a1.04,1.04,0,0,0-1.6944,0L8.4941,14.0444A9.9861,9.9861,0,0,0,7,19a9,9,0,0,0,18,0A10.0632,10.0632,0,0,0,23.4761,13.9932ZM16,26.0005a7.0089,7.0089,0,0,1-7-7,7.978,7.978,0,0,1,1.2183-3.9438l.935-1.4888L21.2271,23.6411A6.9772,6.9772,0,0,1,16,26.0005Z"></path> <rect id="_Transparent_Rectangle_" data-name="<Transparent Rectangle>" class="cls-1" width="32" height="32"></rect> </g></svg>
                        <p id="humidity"> </p>
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
