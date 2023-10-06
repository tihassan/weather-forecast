function getTemp(response) {
  console.log(response.data);
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;
  let roundedTemp = Math.round(response.data.main.temp);
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = `${roundedTemp}`;
  let humidity = document.querySelector("#Humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  let wind = document.querySelector("#Wind");
  wind.innerHTML = `Wind Speeds: ${response.data.wind.speed} mph`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
}

function showLocation(position) {
  console.log(position.coords);
  console.log(position.coords.longitude);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5201594abea9f3e38b70e65b11a80c24";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(getTemp);
}

let todaysDate = document.querySelector("#date");
let currentTime = new Date();
todaysDate.innerHTML = formatDate(currentTime);

let getCurrentWeather = document.querySelector("#current-button");
getCurrentWeather.addEventListener("click", getTemp);

navigator.geolocation.getCurrentPosition(showLocation);

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
