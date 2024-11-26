

import {removeFourClass,getTodayCityWeather} from '../js/utils.js';
import {getTodayGeoData,getTodayWeather,} from '../js/api.js';
import {nameSky,nameVideo,form,input,myID} from '../js/config.js';


form.addEventListener('submit',submitHandler);





// Загружаем город из localStorage при загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const savedCity = localStorage.getItem('city');
        if (savedCity) {
            input.value = savedCity;
            await getTodayCityWeather(savedCity);
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
        await getTodayCityWeather(cityName);
    } catch (error) {
        console.error("Error in submitHandler:", error);
        alert("An error occurred while processing your request. Please try again.");
    }
}











export function putTodayWeatherInfo(data) {

    removeFourClass()

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

    if (nameSky[data.weather]) {
        img.src = `../images/${nameSky[data.weather]}.png`;
    } else {
        img.src = `../images/question.png`;
    }

    const video = document.querySelector('#bg-video');



    if (nameVideo[data.weather]) {
        video.src = `../video/${nameVideo[data.weather]}.mp4`;
    }
   
   
}
