const form = document.querySelector('#form');
const input = document.querySelector('#input');

const myID = "1e4f0f4d21cd1885b6ac9acd4740a729";

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

// Обработчик отправки формы
form.addEventListener('submit', submitHandler);

async function submitHandler(e) {
    e.preventDefault();

    if (!input.value.trim()) {
        alert('Enter a valid city name.');
        return;
    }

    const cityName = input.value.trim();
    localStorage.setItem('city', cityName);
    input.value = '';

    try {
        await getCityWeather(cityName);
    } catch (error) {
        console.error("Ошибка при получении погоды:", error.message);
        alert("Failed to fetch weather data. Please try again.");
    }
}

async function getCityWeather(cityName) {
    try {
        const cityData = await getGeoData(cityName);

        if (!cityData || cityData.length === 0) {
            alert('City not found. Please enter a valid city name.');
            return;
        }

        const lon = cityData[0].lon;
        const lat = cityData[0].lat;

        const weatherInfo = await getWeather(lat, lon);

        if (!weatherInfo || !weatherInfo.weather) {
            alert('Weather data not available for the selected city.');
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
    } catch (error) {
        console.error("Ошибка при получении данных о погоде:", error.message);
        alert("An error occurred while fetching weather data. Please try again later.");
    }
}

async function getGeoData(name) {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${myID}`;

    try {
        const response = await fetch(geoUrl);

        if (!response.ok) {
            throw new Error(`Ошибка геоданных: ${response.statusText}`);
        }

        const geoData = await response.json();
        return geoData;
    } catch (error) {
        console.error("Ошибка при получении геоданных:", error.message);
        throw error;
    }
}

async function getWeather(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${myID}`;

    try {
        const response = await fetch(weatherUrl);

        if (!response.ok) {
            throw new Error(`Ошибка погоды: ${response.statusText}`);
        }

        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.error("Ошибка при получении погодных данных:", error.message);
        throw error;
    }
}

function putWeatherInfo(data) {
    try {
        document.querySelector('.main__container').classList.remove('preview');
        document.querySelector('#bg-video').classList.remove('hidden');
        document.querySelector('.weather').classList.remove('none');
        document.querySelector('.footer').classList.remove('none');

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
    } catch (error) {
        console.error("Ошибка при отображении данных на странице:", error.message);
    }
}
