const form = document.querySelector('#form');

const input = document.querySelector('#input');

const myID = "1e4f0f4d21cd1885b6ac9acd4740a729";



form.addEventListener('submit',submitHandler);

// Загружаем город из localStorage при загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const savedCity = localStorage.getItem('city');
        if (savedCity) {
            input.value = savedCity;
            await getCityWeather(savedCity);
        }
    } catch (error) {
        console.error("Ошибка при загрузке данных из localStorage:", error.message);
    }
});

async function submitHandler(e) {
    e.preventDefault();

    if(!input.value.trim()){
        alert('Enter correct city');
        return
    }
    const cityName = input.value.trim();
    localStorage.setItem("city", cityName);
    input.value = "";
    try {
        await getCityWeather(cityName);
    } catch (error) {
        console.error("Error in submitHandler:", error);
        alert("An error occurred while processing your request. Please try again.");
    }
}



async function getCityWeather(cityName) {

    const cityData = await getGeoData(cityName);

    if (!cityData || cityData.length === 0) {
        alert('City not found. Please enter a valid city name.');
        return;
    }

    const lon = cityData[0].lon;
    const lat = cityData[0].lat;

    const weatherInfo = await getWeather(lat, lon);

    if (weatherInfo.length === 0) {
        return;
    }

    const weatherData = {
        name: weatherInfo.name,
        temp: weatherInfo.main.temp,
        wind: weatherInfo.wind.speed,
        weather: weatherInfo.weather[0]['main'],
        humidity: weatherInfo.main.humidity,
        visibility: weatherInfo.visibility / 1000,
        pressure: weatherInfo.main.pressure,
    };

    putWeatherInfo(weatherData);
   
    
}

async function getGeoData(name) {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${myID}`;

    const response = await fetch(geoUrl);

    if (!response.ok) {
        throw new Error(`Ошибка геоданных: ${response.statusText}`);
    }

    const geoData = await response.json();
    return geoData;
   
    
}

async function getWeather(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${myID}`;

    const response = await fetch(weatherUrl);

  
    const weatherData = await response.json();
    return weatherData;
   
    
}
function removeClass(){
    document.querySelector('.main__container').classList.remove('preview');
    document.querySelector('#bg-video').classList.remove('hidden');
    document.querySelector('.weather').classList.remove('none');
    document.querySelector('.footer').classList.remove('none');
}

function putWeatherInfo(data) {

    removeClass()

    const nameCity = document.querySelector('.weather__city');
    const temp = document.querySelector('.weather__temp');
    const img = document.querySelector('.img-sky');
    const humidity = document.querySelector('.value-hum');
    const visibility = document.querySelector('.value-vis');
    const pressure = document.querySelector('.value-press');
    const wind = document.querySelector('.value-wind');

    nameCity.textContent = data.name;
    temp.textContent = Math.round(data.temp) + '°C';
    humidity.textContent = data.humidity + '%';
    visibility.textContent = data.visibility + ' km';
    pressure.textContent = Math.round(data.pressure) + ' hPa';
    wind.textContent = Math.round(data.wind) + ' km/h';

    const nameSky = {
        'Clouds': 'clouds',
        'Clear': 'clear',
        'Mist': 'Mist',
        'Rain': 'rain',
        'Drizzle': 'drizzle',
        'Snow': 'snow',
    };

    if (nameSky[data.weather]) {
        img.src = `../images/${nameSky[data.weather]}.png`;
    } else {
        img.src = `../images/question.png`;
    }

    const video = document.querySelector('#bg-video');

    const nameVideo = {
        'Clouds': 'clouds',
        'Clear': 'clear',
        'Mist': 'Mist',
        'Rain': 'rain',
        'Drizzle': 'drizzle',
        'Snow': 'snow',
    };

    if (nameVideo[data.weather]) {
        video.src = `../video/${nameVideo[data.weather]}.mp4`;
    }
   
   
}
