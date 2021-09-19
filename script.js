const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), { origin: "cors" });
    const respData = await resp.json();

    console.log(respData);

    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    const weathertype =  data.weather[0].main;
    const temp = KtoC(data.main.temp);
    const feelslike = KtoC(data.main.feels_like);
    const windspeed = data.wind.speed;
    const humidity = data.main.humidity;

    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
        
        <small>${weathertype}</small> <br>
        <small>Feels Like ${feelslike}°C</small> <br>
        <small>Wind Speed ${windspeed} km/h</small> <br>
        <small>Humidity ${humidity}%</small> <br>

    `;

    if(weathertype === "Clouds"){
        document.body.style.background = "linear-gradient(279deg, #86a0cc, #bfc0c0)";
    } else if(weathertype === "Mist"){
        document.body.style.background = "linear-gradient(279deg, #6696e6, #8a8e8e)"
    } else if(weathertype === "Clear"){
        document.body.style.background = "linear-gradient(279deg, #d6dde2, #8a8e8e)"
    } else if(weathertype === "Rain"){
        document.body.style.background = "linear-gradient(279deg, #ef8787, #758ebd)"
    } else{
        document.body.style.background = "linear-gradient(279deg, #bfbaba, #c9ccd2)"
    }

    main.innerHTML = "";

    main.appendChild(weather);
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }
});
