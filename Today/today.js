const form = document.querySelector('#form');
const input = document.querySelector('#input');

const myID = "1e4f0f4d21cd1885b6ac9acd4740a729";


document.addEventListener('DOMContentLoaded', () => {
    const savedCity = localStorage.getItem('city');
    if (savedCity) {
        input.value = savedCity; // Вставляем сохраненный город в поле ввода
        getCityWeather(savedCity); // Загружаем погоду для сохраненного города
    }
});

form.addEventListener('submit',submitHandler);



async function submitHandler(e) {
    e.preventDefault();

    if(!input.value.trim()){
        alert('Enter correct city');
        return
    }

    const cityName = input.value.trim();


    localStorage.setItem('city', cityName);

    input.value = '';


    await getCityWeather(cityName);
}

async function getCityWeather(cityName) {
    const cityData = await getGeoData(cityName);

    if (cityData.length === 0) {
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
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=${1}&appid=${myID}`;
    const response = await fetch(geoUrl);
    const geoData = await response.json();
    return geoData;
}

async function getWeather(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${myID}`;
    const response = await fetch(weatherUrl);
    const weatherData = await response.json();
    return weatherData;
}

function putWeatherInfo(data){
    document.querySelector('.weather').classList.remove('none');
    document.querySelector('.footer').classList.remove('none');
    document.querySelector('.main__container').classList.remove('preview');



    const nameCity = document.querySelector('.weather__city');
    const temp = document.querySelector('.weather__temp');
    const img = document.querySelector('.img-sky');
    const humidity = document.querySelector('.value-hum');
    const visiblity = document.querySelector('.value-vis');
    const pressure = document.querySelector('.value-press');
    const wind = document.querySelector('.value-wind');


    nameCity.textContent = data.name;
    temp.textContent = Math.round(data.temp) + '°C';
   
    humidity.textContent = data.humidity + '%';
    visiblity.textContent = data.visibility + ' km'
    pressure.textContent = Math.round(data.pressure) + ' hPa'
    wind.textContent = Math.round(data.wind) + ' km/h'

    const nameSky = {
        'Clouds':'clouds',
        'Clear':'clear',
        'Mist':'Mist',
        'Rain':'rain',
        'Drizzle':'drizzle',
        'Snow':'snow',
    }

    if(nameSky[data.weather]){
        img.src =`../images/${nameSky[data.weather]}.png`;
    }else{
        img.src =`../images/question.png`;
    }
}

// меняю стиль разделам

// const linkList = document.querySelectorAll('.header__list-item a');

// linkList.forEach((link) => {
//     link.addEventListener('click', addActive);
// });

// function addActive(e) {
//     linkList.forEach((link) => {
//         link.classList.remove('active');
//     });
//     e.currentTarget.classList.add('active'); // Используем e.currentTarget для надежности
// }