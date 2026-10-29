const footer = document.querySelector("footer");
footer.textContent = "";

const city = document.createElement("span");
city.textContent = "Calgary";

const time = document.createElement("span");
const weather = document.createElement("span");
weather.textContent = "Loading weather...";

//footer.append(city, " | ", time, " | ", weather);

footer.append(city, time, weather);

function updateTime() {
  time.textContent = new Date().toLocaleTimeString();
}
updateTime();
setInterval(updateTime, 1000);

fetch("https://api.open-meteo.com/v1/forecast?latitude=51.05&longitude=-114.07&current_weather=true")
  .then(response => response.json())
  .then(data => {
    weather.textContent = data.current_weather.temperature + " °C";
  })
  .catch(() => {
    weather.textContent = "Weather unavailable";
  });