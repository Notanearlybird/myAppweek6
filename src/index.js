let dateElement = document.querySelector("#changeDate");
let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getSeconds();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Friday",
  "Saturday",
];
let day = daysOfWeek[now.getDay()];
let time = `${hours}:${minutes}`;
let fullDate = `${day} ${time}`;
console.log(fullDate);
function formatDate(changeDate) {
  return `${fullDate}`;
}
formatDate();
dateElement.innerHTML = `${fullDate}`;
///
function handlePosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}
console.log(handlePosition.value);
navigator.geolocation.getCurrentPosition(handlePosition);

function weatherCondition(response) {
  console.log(response.data.name);
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function searchCity(cityName) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#citySearch").value;
  searchCity(cityName);
}
function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#searchEngine");
searchForm.addEventListener("submit", handleSubmit);
let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", getCurrentLocation);
searchCity("London");
