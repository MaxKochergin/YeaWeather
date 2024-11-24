import { getCityWeather } from './today.js';

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

export{form, input, myID, submitHandler};