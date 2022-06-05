let apiKey = "77222c1b8ce8f8f06bba18a81a435dbd";

function displayDate() {
  let now = new Date();
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = weekdays[now.getDay()];
  let currentHours = now.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  } else {
    currentHours = now.getHours();
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  } else {
    currentMinutes = now.getMinutes();
  }
  let currentTime = `${currentHours}:${currentMinutes}`;

  let currentTimeDate = document.getElementById("currentTimeDate");
  currentTimeDate.innerHTML = `${currentDay}, ${currentTime}`;

  return currentDay;
}
displayDate();

let searchCityForm = document.getElementById("searchForm");
searchCityForm.addEventListener("submit", generateAllWeatherInfo);

function generateAllWeatherInfo(event) {
  event.preventDefault();
  let cityInput = document.getElementById("cityInputValue").value;
  getCityData(cityInput);
}

function displayCityData(response) {
  let cityName = document.getElementById("selectedCity");
  cityName.innerHTML = response.data.name;
  let currentTemp = response.data.main.temp;
  let currentWeatherIcon = response.data.weather[0].icon;
  let currentDescription = response.data.weather[0].description;
  showCelsius(currentTemp);
  showWeatherIcon(currentWeatherIcon);
  showCurrentDescription(currentDescription);

  let cityLat = response.data.coord.lat;
  let cityLon = response.data.coord.lon;
  getForecastData(cityLat, cityLon);
}

//functions to generate the forecast

function displayForecastData(response) {
  let forecastRow = document.getElementById("forecastRow");
  forecastRow.innerHTML = "";

  for (let i = 1; i < 6; i++) {
    let data = response.data.daily;
    let now = new Date();
    let weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = weekdays[now.getDay() + i];
    let icon = data[i].weather[0].icon;
    let tempMax = Math.round(data[i].temp.max);
    let tempMin = Math.round(data[i].temp.min);

    let html = `
        <div class="col-2">
          <div class="text-center">
            <p>${day}</p>
            <img src="http://openweathermap.org/img/wn/${icon}.png" alt="" />
            <p>${tempMax}° | ${tempMin}° </p>
          </div>
        </div>`;
    forecastRow.innerHTML += html;
  }
}

//functions to generate the current weather information

function showWeatherIcon(icon) {
  let currentWeatherIcon = document.getElementById("current-weather-icon");
  currentWeatherIcon.src = "http://openweathermap.org/img/wn/" + icon + ".png";
}

function showCelsius(celsius) {
  let currentTemperature = document.getElementById("currentTemperature");
  let tempUnit = document.getElementById("celsius");
  currentTemperature.innerHTML = Math.round(celsius);
  tempUnit.innerHTML = "°C";
}

function showCurrentDescription(description) {
  let currentDescription = document.getElementById("current-description");
  currentDescription.innerHTML = description;
}

//functions to get API data

function getCityData(cityInput) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCityData);
}

function getForecastData(lat, lon) {
  let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiForecastUrl).then(displayForecastData);
}

function getCurrentPositionData(currentPosition) {
  let lat = currentPosition.coords.latitude;
  let lon = currentPosition.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCityData);
  axios.get(apiForecastUrl).then(displayForecastData);

  console.log(apiForecastUrl);
}

function displayCurrentPosition() {
  navigator.geolocation.getCurrentPosition(getCurrentPositionData);
}

// Function to load current location data on pageload / refresh

window.onload = function () {
  navigator.geolocation.getCurrentPosition(getCurrentPositionData);
};
