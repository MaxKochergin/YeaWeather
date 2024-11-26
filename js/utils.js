
import {getFiveGeoData,getFiveWeather,} from '../js/api.js';
import {getTodayGeoData,getTodayWeather,} from '../js/api.js';
import {putTodayWeatherInfo} from '../js/today.js';
import {putFiveWeatherInfo} from '../js/fiveDays.js';




// -------------------------fiveday
export function removeTwoClass(){
    document.querySelector('.fivedays').classList.remove('none');
    document.querySelector('.main__container').classList.remove('preview');
}



export function getCurrentDay(dayDate, date){
    const dateString = dayDate['dt_txt'];
    const dat = new Date(dateString);
    
    const options = {
        weekday: "short", 
        month: "short",   
        day: "numeric"    
    };
    
    const formattedDate = dat.toLocaleDateString("en-US", options);
    date.textContent = formattedDate
    
}

export async function getFiveCityWeather(cityName) {

    const cityData = await getFiveGeoData(cityName);

    if (!cityData || cityData.length === 0) {
        alert('City not found. Please enter a valid city name.');
        return;
    }

    const lon = cityData[0].lon;
    const lat = cityData[0].lat;

    const weatherInfo = await getFiveWeather(lat, lon);

    if (weatherInfo.length === 0) {
        return;
    }

    const weatherDataFive = {
        name:weatherInfo.city.name,
    }

    putFiveWeatherInfo(weatherInfo,weatherDataFive);
    
}




//----------------------today
export function removeFourClass(){
    document.querySelector('.main__container').classList.remove('preview');
    document.querySelector('#bg-video').classList.remove('hidden');
    document.querySelector('.weather').classList.remove('none');
    document.querySelector('.footer').classList.remove('none');
}



export async function getTodayCityWeather(cityName) {

    const cityData = await getTodayGeoData(cityName);

    if (!cityData || cityData.length === 0) {
        alert('City not found. Please enter a valid city name.');
        return;
    }

    const lon = cityData[0].lon;
    const lat = cityData[0].lat;

    const weatherInfo = await getTodayWeather(lat, lon);

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


    putTodayWeatherInfo(weatherData);
   
    
}





