const input = document.querySelector('#input');
const form = document.querySelector('#form');

import {removeClassFive,getCurrentDay,getFiveCityWeather} from '../js/utils.js';
import {getFiveGeoData,getFiveWeather,} from '../js/api.js';
import {nameSky,myID,selectedIndexes} from '../js/config.js';

form.addEventListener('submit',submitHandler);

// Загружаем город из localStorage при загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const savedCity = localStorage.getItem('city');
        if (savedCity) {
            input.value = savedCity;
            await getFiveCityWeather(savedCity);
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
    
    await getFiveCityWeather(cityName);
}








export function putFiveWeatherInfo(data,dataName){

    removeClassFive();
    

    const fiveDayData = data.list.filter((info, index) => selectedIndexes.includes(index));
    console.log(fiveDayData)
    

    const cardsWeather = document.querySelectorAll('.weather');
    
    fiveDayData.forEach((dayDate, index) =>{
        let card = cardsWeather[index];
        const temp = card.querySelector('.weather__temp');
        const img = card.querySelector('.img-sky');
        const date = card.querySelector('.weaher__day');

        temp.textContent = Math.round(dayDate['main']['temp']) + '°C';

        
        const weatherType = dayDate['weather'][0]['main'];
        if(img){
            if(nameSky[weatherType]){
                img.src =`../images/${nameSky[weatherType]}.png`;
            }else{
                img.src =`../images/question.png`;
            } 
        }
        getCurrentDay(dayDate,date);

        

    })

    const nameCities = document.querySelectorAll('.weather__city');

    nameCities.forEach((city) => {
        city.textContent = dataName.name
    })
}

