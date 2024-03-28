const apiKey = '517bee7165f36c269ad0336a4dcf4065'; // Replace with your actual API key
const city = 'London'; // Replace with the desired city
let weatherdt ={};

async function weatherData() {
    let weatherData;

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)

    weatherData = await res.json();
    if(weatherData){
        weatherdt = weatherData;
    }

}

weatherData();
setTimeout(function(){
    console.log(weatherdt)

    document.getElementById('location').textContent = weatherdt.name;
    document.getElementById('temperature').textContent = weatherdt.main.temp+ ' °';
    document.getElementById('description').textContent = weatherdt.weather.description;
},1000)