document.getElementById("temp1").textContent = weatherData1.main.temp;
document.getElementById("humidity1").textContent = weatherData1.main.humidity;
document.getElementById("description1").textContent = weatherData1.weather[0].description;
const apiKey = '517bee7165f36c269ad0336a4dcf4065'; // Replace with your actual API key
const city = 'London'; // Replace with the desired city

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        // Process and display the weather data
        console.log(data);
    })
    .catch(error => {
        // Handle errors
        console.error('Error fetching weather data:', error);
    });
// Assuming you have the weather data in a variable called 'weatherData'
document.getElementById('location').textContent = weatherData.name;
document.getElementById('temperature').textContent = weatherData.main.temp + ' °';
document.getElementById('description').textContent = weatherData.weather[0].description;