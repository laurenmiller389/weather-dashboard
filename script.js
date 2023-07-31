var searchButtonElement = document.getElementById("search-button");
var searchCityElement = document.querySelector("#city-search");

var latitude;
var longitude;

var today = dayjs().format("ddd MMM D, YYYY")

function getWeatherApi () {
    var reqUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCityElement.value + "&appid=" + apiKey + "&units=imperial"
}