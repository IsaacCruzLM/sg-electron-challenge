function getWeatherByCityId(cityId) {
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=0323a0a2e456757e8a98c09bec2ba751`;
    const request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return JSON.parse(request.responseText)
};

function getWeatherByName(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=0323a0a2e456757e8a98c09bec2ba751`;
    const request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return JSON.parse(request.responseText)
};

function searchCityByName() {
    const nameInput = document.getElementById('SearchModalInput').value;
    const newData = getWeatherByName(nameInput);

    if (newData.cod == '404') {
        closeModalForSearchCity();
        return alert('Desculpe, não foi possível encontrar está cidade')
    } else {
        const newOption = document.createElement('option');
        newOption.value = newData.id;
        newOption.innerText = newData.name;
        newOption.selected = true;

        const select = document.getElementById('selectCity');
        select.appendChild(newOption);

        renderAPIRespostData(newData);

        closeModalForSearchCity();
    }
}

function openModalForSearchCity() {
    const modal = document.getElementById('searchModal');
    modal.style.display = 'block';
}

function closeModalForSearchCity() {
    const modal = document.getElementById('searchModal');
    modal.style.display = 'none';

    document.getElementById('SearchModalInput').value = "";
}

function changeIconByWeatherMain(weatherMain) {
    const weatherMainElement = document.getElementById('WeatherMain');
    const weatherMainIconElement = document.getElementById('WeatherMainIcon');
    
    switch (weatherMain) {
        case "Thunderstorm":
            weatherMainElement.innerText = 'Tempestade';
            weatherMainIconElement.className = 'uil uil-thunderstorm';
            break;
        case "Rain":
            weatherMainElement.innerText = 'Chuva';
            weatherMainIconElement.className = 'uil uil-cloud-showers-heavy';
            break;
        case "Snow":
            weatherMainElement.innerText = 'Neve';
            weatherMainIconElement.className = 'uil uil-cloud-hail';
            break;
        case "Clear":
            weatherMainElement.innerText = 'Ensolarado';
            weatherMainIconElement.className = 'uil uil-cloud-sun';
            break;
        case "Clouds":
            weatherMainElement.innerText = 'Nublado';
            weatherMainIconElement.className = 'uil uil-clouds';
            break;
        default:
            weatherMainElement.innerText = 'Clima Indefinido';
            weatherMainIconElement.className = 'uil uil-cloud-meatball';
            break;
    }
}

function renderAPIRespostData(data) {
    const { temp, feels_like, temp_min, temp_max, pressure, humidity } = data.main;
    const { speed } = data.wind;
    const { main } = data.weather[0];

    document.getElementById('CityTemp').innerText = (parseInt(temp) -273.15).toFixed(0);
    document.getElementById('WindSpeed').innerText = (parseInt(speed)).toFixed(0);
    document.getElementById('Humidity').innerText = (parseInt(humidity)).toFixed(0);
    document.getElementById('Pressure').innerText = (parseInt(pressure)).toFixed(0);
    document.getElementById('MaximumTemperature').innerText = (parseInt(temp_max) -273.15).toFixed(0);
    document.getElementById('MinimumTemperature').innerText = (parseInt(temp_min) -273.15).toFixed(0);
    document.getElementById('ThermalSensation').innerText = (parseInt(feels_like) -273.15).toFixed(0);

    changeIconByWeatherMain(main);
};

function main() {
    renderAPIRespostData(getWeatherByCityId(6321162));

    const selectCity = document.getElementById('selectCity');
    selectCity.addEventListener("change", (event) => {
        const newData = getWeatherByCityId(selectCity.value)
        renderAPIRespostData(newData);
    });

    const openModalButton = document.getElementById('OpenModalButton');
    openModalButton.addEventListener("click", openModalForSearchCity);

    const closeModalButton = document.getElementById('CloseModalButton');
    closeModalButton.addEventListener("click", closeModalForSearchCity);

    const seacrhModalButton = document.getElementById('SearchModalButton');
    seacrhModalButton.addEventListener("click", searchCityByName);
};

main();