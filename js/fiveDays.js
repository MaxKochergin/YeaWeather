
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
        name:weatherInfo.city.name,
    }

    putWeatherInfo(weatherInfo,weatherData);
    
}

async function getGeoData(name) {

    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${myID}`;
    const response = await fetch(geoUrl);


    const geoData = await response.json();
    return geoData;
    
}


async function getWeather(lat, lon) {

    const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${myID}`;
    const response = await fetch(weatherUrl);

   
    const weatherData = await response.json();
    return weatherData;

    
}

function removeClass(){
    document.querySelector('.fivedays').classList.remove('none');
    document.querySelector('.main__container').classList.remove('preview');
}


function putWeatherInfo(data,dataName){
    removeClass();
    const selectedIndexes = [0, 8, 16,24,32]

    const fiveDayData = data.list.filter((info, index) => selectedIndexes.includes(index));
    

    const cardsWeather = document.querySelectorAll('.weather');
    
    fiveDayData.forEach((dayDate, index) =>{
        let card = cardsWeather[index];
        const temp = card.querySelector('.weather__temp');
        const img = card.querySelector('.img-sky');
        const date = card.querySelector('.weaher__day');

        temp.textContent = Math.round(dayDate['main']['temp']) + '°C';
        
        const nameSky = {
            'Clouds':'clouds',
            'Clear':'clear',
            'Mist':'Mist',
            'Rain':'rain',
            'Drizzle':'drizzle',
            'Snow':'snow',
        }
        
        const weatherType = dayDate['weather'][0]['main'];
        if(img){
            if(nameSky[weatherType]){
                img.src =`../images/${nameSky[weatherType]}.png`;
            }else{
                img.src =`../images/question.png`;
            } 
        }
   
        
        const dateString = dayDate['dt_txt'];
        const dat = new Date(dateString);
    
        const options = {
            weekday: "short", 
            month: "short",   
            day: "numeric"    
        };
    
        const formattedDate = dat.toLocaleDateString("en-US", options);
        date.textContent = formattedDate
        

    })

    const nameCities = document.querySelectorAll('.weather__city');

    nameCities.forEach((city) => {
        city.textContent = dataName.name
    })
}

