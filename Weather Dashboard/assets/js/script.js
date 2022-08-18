const searchBtn = $('#search-btn');
const todayEl = $('#current-weather');
const futureEl = $('#future-weather');
const dateTimeEl = $('#date-time');
const city = $('#city');
const pastSearches = $('#past-searches');
const dateTimeIcon = $('#date-time-icon');
let pastCity = [];

const apiKey = 'c4efde1256af8c7718fe0b08e34be0c1';

searchBtn.on('click', function () {
    const cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city.val()}&limit=5&appid=${apiKey}`;
    fetch(cityUrl).then(function (response) {
        return response.json()
    }).then(function (data) {
        getWeather(data[0].lat, data[0].lon, data[0].name);
        console.log(data)
    });
})

function getWeather(lat, lon, city) {
    const currentApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(currentApi).then(function (response) {
        return response.json()
    }).then(function (data) {
        console.log(data);
        displayTodaysWeather(city, data.current.dt, data.current.weather[0].icon, data.current.temp, data.current.wind_speed, data.current.humidity, data.current.uvi);
        storeWeather(city);
    })
}

function displayTodaysWeather(city, date, icon, temp, wind, humidity, uvi) {
    const formatDate = new Date(date * 1000).toDateString();


    dateTimeEl.append(`<h2>${city} (${formatDate})</h2>`);
    todayEl.append(dateTimeEl)
    const currentIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    dateTimeIcon.append(`<img src="${currentIcon}"/>`);
    todayEl.append(dateTimeIcon);
    const todaysTempEl = $(`<p>Temperature: ${temp}</p>`);
    todayEl.append(todaysTempEl);
    const todaysWindEl = $(`<p>Wind: ${wind} MPH</p>`);
    todayEl.append(todaysWindEl);
    const todaysHumEl = $(`<p>Humidity: ${humidity} %</p>`);
    todayEl.append(todaysHumEl);
    const todaysUviEl = $(`<p>UV Index: ${uvi}</p>`);
    todayEl.append(todaysUviEl);
}


function storeWeather(city) {

    pastCity.push(city);
    localStorage.setItem('searched', JSON.stringify(pastCity));
    pastSearches.append(`<button>${city}</button>`)
}

function updateSearchedButtons() {

    if (localStorage.getItem('searched')) {
        pastCity = JSON.parse(localStorage.getItem('searched'));
    }
    for (let i = 0; i < pastCity.length; i++) {
        pastSearches.append(`<button>${pastCity[i]}</button>`)
    }
}

updateSearchedButtons();


