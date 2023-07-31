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
        .then(function (data) {
            var dayIndexElement = 1
            for (i = 5; i < 39; i+=8) {
                document.getElementById("day-"+ dayIndexElement + "-date").textContent = data.list[i].dt_txt.slice(0, 10);
                document.getElementById("day-"+ dayIndexElement + "-icon").src = `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`
                document.getElementById("day-"+ dayIndexElement + "-temp").textContent = "Temp: " + data.list[i].main.temp + " F\xB0";
                document.getElementById("day-"+ dayIndexElement + "-wind").textContent = "Wind: " + data.list[i].wind.speed + " MPH";
                document.getElementById("day-"+ dayIndexElement + "-wind").textContent = "Wind: " + data.list[i].wind.speed + " MPH";
                document.getElementById("day-"+ dayIndexElement + "-humid").textContent = "Humidity: " + data.list[i].main.humidity + "%";
                dayIndexElement++;
            }
        })
    })
}

function makeButton () {
    var city = document.querySelector("#city-search").value;

    localStorage.setItem(city, city)
    for(i = 0; i < localStorage.length; i++) {
        var lastSearchButton = document.createElement("button")
        lastSearchButton.textContent = localStorage.getItem(localStorage.key(i))
        document.getElementById("last-search").appendChild(lastSearchButton)
        lastSearchButton.addEventListener("click", function (event) {
            event.preventDefault();
            searchCityElement.value = this.textContent;
            getWeatherApi();
        })
    }
}

searchButtonElement.addEventListener("click", function(event) {
    event.preventDefault();
    getWeatherApi();
    makeButton();
})