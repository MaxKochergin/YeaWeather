function putWeatherInfo(weatherInfo) {
    document.querySelector('.fivedays').classList.remove('none');
    document.querySelector('.main__container').classList.remove('preview');

    // Выбираем все карточки
    const cards = document.querySelectorAll('.weather');

    // Используем первые элементы из списка прогнозов для заполнения карточек
    weatherInfo.list.slice(0, cards.length).forEach((forecast, index) => {
        const card = cards[index];
        const nameCity = card.querySelector('.weather__city');
        const temp = card.querySelector('.weather__temp');
        const img = card.querySelector('.weather__img-sky img');
        const dateElem = card.querySelector('.weaher__day');

        // Заполняем данные для текущей карточки
        if (nameCity) nameCity.textContent = weatherInfo.city.name;
        if (temp) temp.textContent = Math.round(forecast.main.temp) + '°C';

        // Форматируем дату
        const date = new Date(forecast.dt_txt);
        const options = { weekday: "short", month: "short", day: "numeric" };
        if (dateElem) dateElem.textContent = date.toLocaleDateString("en-US", options);

        // Устанавливаем изображение погоды
        const nameSky = {
            Clouds: 'clouds',
            Clear: 'clear',
            Mist: 'Mist',
            Rain: 'rain',
            Drizzle: 'drizzle',
            Snow: 'snow',
        };

        if (img) {
            img.src = nameSky[forecast.weather[0].main]
                ? `images/${nameSky[forecast.weather[0].main]}.png`
                : `images/question.png`;
        }
    });
}