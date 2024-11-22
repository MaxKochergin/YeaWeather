const form = document.querySelector('#form');
const input = document.querySelector('#input');

const myID = "1e4f0f4d21cd1885b6ac9acd4740a729";

form.addEventListener('submit',submitHandler);
async function submitHandler(e) {
    e.preventDefault();

    if(!input.value.trim()){
        alert('Enter correct city');
        return
    }

    const cityName = input.value.trim();
    input.value = '';


    const cityData = await getGeoData(cityName);

    if(cityData.length === 0){
        return
    }

    let lon = cityData[0].lon;
    let lat = cityData[0].lat;


    const weatherInfo = await getWeather(lat,lon);

    if(weatherInfo.length === 0){
        return
    }

    const weatherData = {
        name:weatherInfo.city.name,
    }
    console.log(weatherInfo)

    putWeatherInfo(weatherInfo,weatherData);
}


async function getGeoData(name) {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=${1}&appid=${myID}`;
    const response = await fetch(geoUrl);
    const geoData = await response.json();
    return geoData
}


async function getWeather(lat,lon){
    const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${myID}`;
    const response = await fetch(weatherUrl);
    const weatherData = await response.json();
    return weatherData;
}


function putWeatherInfo(data,dataName){
    document.querySelector('.fivedays').classList.remove('none');
    document.querySelector('.main__container').classList.remove('preview');

    const selectedIndexes = [0, 8, 16,24,32]

    fiveDayData = data.list.map((info, index) => {
        if(selectedIndexes.includes(index)){
            return info
        }
        return null;
    }).filter(info => info !== null);
    console.log(fiveDayData)

    const cardsWeather = document.querySelectorAll('.weather');
    
    fiveDayData.forEach((dayDate, index) =>{
        let card = cardsWeather[index];
        const temp = card.querySelector('.weather__temp');
        const img = card.querySelector('.img-sky');
        const date = card.querySelector('.weaher__day');

        temp.textContent = dayDate['main']['temp'] + '°C';
        
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
                img.src =`images/${nameSky[weatherType]}.png`;
            }else{
                img.src =`images/question.png`;
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
