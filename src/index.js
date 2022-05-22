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
  currentTimeDate.innerHTML = `${currentDay} ${currentTime}`;
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
  showCelsius(currentTemp);
}

function showCelsius(celsius) {
  let currentTemperature = document.getElementById("currentTemperature");
  currentTemperature.innerHTML = `${Math.round(
    celsius
  )} C° | <a href="#" onclick="showFahrenheit(${celsius})">F°</a> `;
}

function showFahrenheit(celsius) {
  let currentTemperature = document.getElementById("currentTemperature");
  currentTemperature.innerHTML = `${Math.round(
    celsius * 1.8 + 32
  )} <a href="#" onclick="showCelsius(${celsius})">C°</a> | F° `;
}

function getCityData(cityInput) {
  let apiKey = "77222c1b8ce8f8f06bba18a81a435dbd";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCityData);
}

function getCurrentPositionData(currentPosition) {
  let apiKey = "77222c1b8ce8f8f06bba18a81a435dbd";

  let lat = currentPosition.coords.latitude;
  let lon = currentPosition.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCityData);
}

function displayCurrentPosition() {
  navigator.geolocation.getCurrentPosition(getCurrentPositionData);
}
