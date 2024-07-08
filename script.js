let cityInput = document.getElementById('city_input'),
    searchBtn = document.getElementById('searchBtn'),
    locationBtn = document.getElementById('locationBtn'),
    api_key = '62deb1fb0f761178c9d0c349b82b85a6',
    currentWeatherCard = document.querySelectorAll('.weather-left .card')[0],
    fiveDaysForecastCard = document.querySelector('.day-forecast'),
    aqiCard = document.querySelectorAll('.highlights .card')[0],
    sunriseCard = document.querySelectorAll('.highlights .card')[1],
    humidityVal = document.getElementById('humidityval'),
    pressureVal = document.getElementById('Pressureval'),
    visibilityVal = document.getElementById('visibilityval'),
    windSpeedVal = document.getElementById('windspeedval'),
    feelsLikeVal = document.getElementById('feelslikeval'),
    hourlyForecastCard = document.querySelector('.hourly-forecast'),
    aqilist = ['Good', 'fair', 'moderate', 'poor', 'very poor'];

function getWeatherDetails(name, lat, lon, country, state) {
    let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
        WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
        AIR_POLLUTION_API_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`;
    days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
        months = [
            'jan',
            'feb',
            'mar',
            'apr',
            'may',
            'jun',
            'jul',
            'aug',
            'sep',
            'oct',
            'nov',
            'dec'
        ];

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        let date = new Date();
        currentWeatherCard.innerHTML = `
            <div class="current-weather">
                        <div class="details">
                            <p>Now</p>
                            <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;c</h2>
                            <p>${data.weather[0].description}</p>
                        </div>
                        <br>
                        <br>
                        <div class="weather-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                                class="bi bi-clouds" viewBox="0 0 16 16">
                                <path
                                    d="M16 7.5a2.5 2.5 0 0 1-1.456 2.272 3.5 3.5 0 0 0-.65-.824 1.5 1.5 0 0 0-.789-2.896.5.5 0 0 1-.627-.421 3 3 0 0 0-5.22-1.625 5.6 5.6 0 0 0-1.276.088 4.002 4.002 0 0 1 7.392.91A2.5 2.5 0 0 1 16 7.5" />
                                <path
                                    d="M7 5a4.5 4.5 0 0 1 4.473 4h.027a2.5 2.5 0 0 1 0 5H3a3 3 0 0 1-.247-5.99A4.5 4.5 0 0 1 7 5m3.5 4.5a3.5 3.5 0 0 0-6.89-.873.5.5 0 0 1-.51.375A2 2 0 1 0 3 13h8.5a1.5 1.5 0 1 0-.376-2.953.5.5 0 0 1-.624-.492z" />
                            </svg>
                        </div>
                    </div>
                    <br>
                    <hr>
                    <div class="card-footer">
                        <p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-calendar3" viewBox="0 0 16 16">
                                <path
                                    d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                                <path
                                    d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                            </svg>${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}</p>
                        <p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-geo-alt" viewBox="0 0 16 16">
                                <path
                                    d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg></i>${name}, ${country}</p>
                    </div>
        `;
        let { sunrise, sunset } = data.sys,
            { timezone, visibility } = data,
            { humidity, pressure, feels_like } = data.main,
            { speed } = data.wind,
            sRiseTime = moment.utc(sunrise, 'X').add(timezone, 'seconds').format('hh:mm A'),
            sSetTime = moment.utc(sunset, 'X').add(timezone, 'seconds').format('hh:mm A');
        sunriseCard.innerHTML = `
             <div class="card-head">
                            <p>Sunrise & Sunset</p>
                        </div>
                        <div class="sunrise-sunset">
                            <div class="item">
                                <div class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor"
                                        class="bi bi-sunrise" viewBox="0 0 16 16">
                                        <path
                                            d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707m11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0M8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7m3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                                    </svg>
                                </div>
                                <div>
                                    <p>Sunrise</p>
                                    <h2>${sRiseTime}</h2>
                                </div>
                            </div>
                            <div class="item">
                                <div class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor"
                                        class="bi bi-sunset" viewBox="0 0 16 16">
                                        <path
                                            d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7m3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                                    </svg>
                                </div>
                                <div>
                                    <p>Sunset</p>
                                    <h2>${sSetTime}</h2>
                                </div>
                            </div>
                        </div>
        `;
        humidityVal.innerHTML = `${humidity}%`;
        pressureVal.innerHTML = `${pressure}hpa`;
        visibilityVal.innerHTML = `${visibility / 1000}km`;
        windSpeedVal.innerHTML = `${speed}m/s`;
        feelsLikeVal.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;c`;
    }).catch(() => {
        alert(`failed to fetch current weather`);
    });

    fetch(FORECAST_API_URL).then(res => res.json()).then(data => {
        let hourlyForecast = data.list;
        hourlyForecastCard.innerHTML = '';
        for (i = 1; i <= 8; i++) {
            let hrForecastDate = new Date(hourlyForecast[i].dt_txt);
            let hr = hrForecastDate.getHours();
            let a = 'pm';
            if (hr < 12) a = 'AM';
            if (hr == 0) hr = 12;
            if (hr >= 12) hr = hr - 12;
            hourlyForecastCard.innerHTML += `
               <div class="card">
                        <p>${hr} ${a}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                            class="bi bi-clouds" viewBox="0 0 16 16">
                            <path
                                d="M16 7.5a2.5 2.5 0 0 1-1.456 2.272 3.5 3.5 0 0 0-.65-.824 1.5 1.5 0 0 0-.789-2.896.5.5 0 0 1-.627-.421 3 3 0 0 0-5.22-1.625 5.6 5.6 0 0 0-1.276.088 4.002 4.002 0 0 1 7.392.91A2.5 2.5 0 0 1 16 7.5" />
                            <path
                                d="M7 5a4.5 4.5 0 0 1 4.473 4h.027a2.5 2.5 0 0 1 0 5H3a3 3 0 0 1-.247-5.99A4.5 4.5 0 0 1 7 5m3.5 4.5a3.5 3.5 0 0 0-6.89-.873.5.5 0 0 1-.51.375A2 2 0 1 0 3 13h8.5a1.5 1.5 0 1 0-.376-2.953.5.5 0 0 1-.624-.492z" />
                        </svg>
                        <p>${(hourlyForecast[i].main.temp - 273.15).toFixed(2)} &deg;c</p>
                    </div>
            `;
        }
        let uniqueForecastDays = [];
        let fiveDaysForecast = data.list.filter(forecast => {
            let forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });
        // console.log(fiveDaysForecast);
        fiveDaysForecastCard.innerHTML = '';
        for (i = 1; i < fiveDaysForecast.length; i++) {
            let date = new Date(fiveDaysForecast[i].dt_txt);
            fiveDaysForecastCard.innerHTML += `
                <div class="forecast-item">
                            <div class="icon-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                                    class="bi bi-cloud" viewBox="0 0 16 16">
                                    <path
                                        d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                                </svg>
                                <span>${(fiveDaysForecast[i].main.temp - 273.15).toFixed(2)}&deg;c</span>
                            </div>
                            <p>${date.getDate()} ${months[date.getMonth()]}</p>
                            <p>${days[date.getDay()]}</p>
                        </div>
            `;
        }
    }).catch(() => {
        alert(`failed to fetch weather forecast`);
    });
    fetch(AIR_POLLUTION_API_URL).then(res => res.json()).then(data => {
        let { co, no, o3, so2, pm2_5, pm10, nh3 } = data.list[0].components;
        aqiCard.innerHTML = `
            <div class="card-head">
                            <p>Air Quality index</p>
                            <p class="air-index aqi-${data.list[0].main.aqi}">${aqilist[data.list[0].main.aqi - 1]}</p>
                        </div>
                        <div class="air-indices">
                            <!-- <i class="fa-regular fa-wind fa-3x"></i> -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor"
                                class="bi bi-wind" viewBox="0 0 16 16">
                                <path
                                    d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
                            </svg>
                            <div class="item">
                                <p>PM2.5</p>
                                <h2>${pm2_5}</h2>
                            </div>
                            <div class="item">
                                <p>PM10</p>
                                <h2>${pm10}</h2>
                            </div>
                            <div class="item">
                                <p>SO2</p>
                                <h2>${so2}</h2>
                            </div>
                            <div class="item">
                                <p>CO</p>
                                <h2>${co}</h2>
                            </div>
                            <div class="item">
                                <p>NO</p>
                                <h2>${no}</h2>
                            </div>
                            <div class="item">
                                <p>NH3</p>
                                <h2>${nh3}</h2>
                            </div>
                            <div class="item">
                                <p>O3</p>
                                <h2>${o3}</h2>
                            </div>
                        </div>
        `;
    }).catch(() => {
        alert(`failed to fetch Air Quality Index`);
    });
}

function getCityCoordinates() {
    let cityName = cityInput.value.trim();
    cityInput.value = '';
    if (!cityName) return;
    let GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${api_key}`;
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        let { name, lat, lon, country, state } = data[0];
        getWeatherDetails(name, lat, lon, country, state);
    }).catch(() => {
        alert(`Failed to fetch coordinates of ${cityName}`);
    });
}
function getUserCoordinates() {
    navigator.geolocation.getCurrentPosition(position => {
        let { latitude, longitude } = position.coords;
        let REVERSE_GEOCODING_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${api_key}`;

        fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data => {
            let { name, country, state } = data[0];
            getWeatherDetails(name, latitude, longitude, country, state);
        }).catch(() => {
            alert(`failed to fetch user coordinates`);
        });
    }, error => {
        if (error.code === error.PERMISSION_DENIED) {
            alert('geolocation.permission denied. Please reset location permission to grant access again');
        }
    });
}
searchBtn.addEventListener('click', getCityCoordinates);
locationBtn.addEventListener('click', getUserCoordinates);
cityInput.addEventListener('keyup', e => e.key === 'enter' && getCityCoordinates());
window.addEventListener('load', getUserCoordinates);
