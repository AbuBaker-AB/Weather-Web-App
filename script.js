const apikey = "da454f429ed23b8ec3022fba48561f5d";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const search = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weather = document.querySelector('.weather-icon');
const card = document.querySelector('.card');

async function checkWeather(city) {
    const response = await fetch(`${apiURL}${city}&appid=${apikey}`);

    if (!response.ok) {
        document.querySelector('.error').style.display = "block";
        document.querySelector('.weather').style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
        document.querySelector(".wind").innerHTML = data.wind.speed + 'km/h';

        
        if (data.weather[0].main === "Clouds") {
            weather.src = "clouds.png";
        } else if (data.weather[0].main === "Rain") {
            weather.src = "rain.png";
        } else if (data.weather[0].main === "Clear") {
            weather.src = "clear.png";
        } else if (data.weather[0].main === "Drizzle") {
            weather.src = "drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weather.src = "mist.png";
        } else if (data.weather[0].main === "Snow") {
            weather.src = "snow.png";
        }

        
        const currentTime = new Date().getTime() / 1000; 
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;

        
        if (currentTime >= sunrise && currentTime < sunset) {
            card.style.background = "linear-gradient(135deg, #87CEEB, #FFA07A)"; 
        } else {
            card.style.background = "linear-gradient(135deg, #001D3D, #1B3B5F)"; 
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", function () {
    checkWeather(search.value);
});