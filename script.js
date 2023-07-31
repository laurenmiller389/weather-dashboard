var searchButtonElement = document.getElementById("search-button");
var searchCityElement = document.querySelector("#city-search");

var latitude;
var longitude;

var today = dayjs().format("ddd MMM D, YYYY")

function getWeatherApi () {
    var reqURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCityElement.value + "&appid=" + apiKey + "&units=imperial"
    
    fetch(reqURL).then(function (res) {
        return res.json();
    })
    .then(function (data) {
        document.getElementById("city-name").textContent = data.name + " (" + today + ") ";
        document.getElementById("city-icon").src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        document.getElementById("city-temp").textContent = "Temp: " + data.main.temp + " F\xB0";
        document.getElementById("city-wind").textContent = "Wind: " + data.wind.speed + " MPH";
        document.getElementById("city-humid").textContent = "Humid: " + data.main.humidity + "%";
        longitude = data.coord.longitude;
        latitude = data.coord.latitude;

        var reqURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial";
    
        fetch(reqURL).then(function (res) {
            return res.json();
        })
    })
}