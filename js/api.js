
import {myID} from '../js/config.js';

export async function getFiveGeoData(name) {

    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${myID}`;
    const response = await fetch(geoUrl);


    const geoData = await response.json();
    return geoData;
    
}


export async function getFiveWeather(lat, lon) {

    const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${myID}`;
    const response = await fetch(weatherUrl);

   
    const weatherData = await response.json();
    return weatherData;

    
}
// today

export async function getTodayGeoData(name) {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${myID}`;

    const response = await fetch(geoUrl);

    if (!response.ok) {
        throw new Error(`Ошибка геоданных: ${response.statusText}`);
    }

    const geoData = await response.json();
    return geoData;
   
    
}

export async function getTodayWeather(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${myID}`;

    const response = await fetch(weatherUrl);

  
    const weatherData = await response.json();
    return weatherData;
   
    
}
