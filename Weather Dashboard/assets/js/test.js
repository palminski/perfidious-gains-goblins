const searchBtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('#city');
const todayEl = document.querySelector('#current-weather');
const futureEl = document.querySelector('#future-weather');
let pastEl = document.querySelector('past-searches')
let searchedArr = [];

const apiKey = 'c4efde1256af8c7718fe0b08e34be0c1';

searchBtn.addEventListener('click', function () {
    const cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput.value}&limit=5&appid=${apiKey}`;
    fetch(cityUrl)
        .then(res => res.json())
        .then(data => {
            getWeather(data[0].lat, data[0].lon, data[0].name)
        });
})

function getWeather(lat, lon, city) {
    const currentApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(currentApi)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const formatDate = new Date(data.current.dt * 1000).toDateString()
            console.log(formatDate)
            let currentIcon = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
            let futureIcon = `http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`;


            todayEl.innerHTML =
                `<h3>${city} (${formatDate})<h3>
            <div class='row'>
                <div>
                    <p>${data.current.temp}&#8457</p>
                    <p>${data.current.wind_speed} MPH</p>
                    <p>${data.current.humidity} %</p>
                    <p class="p-3 mb-2 bg-secondary text-white">${data.current.uvi}</p>
                </div>
                <div>
                    <img src= "http://openweathermap.org/img/wn/${currentIcon}@2x.png">;
                </div>
            </div>`

            for (let i = 0; i < 5; i++) {
                futureEl.innerHTML = `
            <div>
                <h2>${data.daily[0].dt}</h2>
                <img src= "http://openweathermap.org/img/wn/${futureIcon}@2x.png">
                <p>${data.daily[0].temp.day}&#8457</p>
                <p>${data.daily[0].wind_speed} MPH</p>
                <p>${data.daily[0].humidity} %</p>
            </div>`
            }

            searchedArr.push(city);
            localStorage.setItem('searched', JSON.stringify(searchedArr));
            pastEl.appendChild(<button>${city}</button>)

            if (localStorage.getItem('searched')) {
                searchedArr = JSON.parse(localStorage.getItem('searched'));
            }
            for (let i = 0; i < pastCity.length; i++) {
                pastEl.appendChild(`<button>${searchedArr[i]}</button>`)
            }
        });
}

