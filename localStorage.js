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
        name:weatherInfo.city.name,
    }

    putWeatherInfo(weatherData);
}