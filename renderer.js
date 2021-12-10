async function getWeatherByCityId(cityId) {
    initLogin()
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=0323a0a2e456757e8a98c09bec2ba751`;
    const request = await fetch(url);
    const data = await request.json();
    closeLogin()
    return data;
};

async function getWeatherByName(cityName) {
    initLogin()
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=0323a0a2e456757e8a98c09bec2ba751`;
    const request = await fetch(url);
    const data = await request.json();
    closeLogin()
    return data;
};

function initLogin() {
    const loading = document.getElementById('Loading');
    loading.style.display = 'flex';
    const main = document.getElementById('MainContent');
    main.style.display = 'none';
}

function closeLogin() {
    const main = document.getElementById('MainContent');
    main.style.display = 'block';
    const loading = document.getElementById('Loading');
    loading.style.display = 'none';
}

async function searchCityByName() {
    const nameInput = document.getElementById('SearchModalInput').value;
    const newData = await getWeatherByName(nameInput);

    if (newData.cod == '404') {
        closeModalForSearchCity();
        return alert('Desculpe, não foi possível encontrar esta cidade')
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
};

function openModalForSearchCity() {
    const modal = document.getElementById('searchModal');
    modal.style.display = 'block';
};

function closeModalForSearchCity() {
    const modal = document.getElementById('searchModal');
    modal.style.display = 'none';

    document.getElementById('SearchModalInput').value = "";
};

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
};

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

async function main() {
    renderAPIRespostData( await getWeatherByCityId(6321162));

    const selectCity = document.getElementById('selectCity');
    selectCity.addEventListener("change", async (event) => {
        const newData = await getWeatherByCityId(selectCity.value)
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
