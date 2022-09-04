var formInput = document.querySelector("#user-form");
var cityInput = document.querySelector("#city-input");
var cityHistoryEl = document.querySelector(".city-search-history");
var cityWeatherEl = document.querySelector(".city-weather");
var cityForecastEl = document.querySelector(".city-forecast");
const apiKey = "2ce974ae126aef3e2b73d8d71731bb9d";
const apiKey_UV = "642f411ae74d41aab68e27e199707737";
var cityContainerEl = document.querySelector(".city-container");

var formSubmitHandler = function (event) {
    event.preventDefault();

    // get value from input
    var city = cityInput.value.trim();
    console.log(city);
    cityInput.value = "";
    
    displayCityButton(city);
};

var displayCityButton = function (cityName) {
    var cityHistory = document.createElement("button");
    cityHistory.className = "city-search";
    // cityHistoryEl.setAttribute("href", cityName);
    cityHistory.textContent = cityName;
    cityHistoryEl.appendChild(cityHistory);
    localStorage.setItem("city", cityName);
    getCityWeather(cityName);
};

var getCityWeather = function (cityName) {
    // get city coords by using the city name as the input
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + apiKey;

    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                getCityWeather(data);
            });
        } else {
            alert("Error: City Not Found");
        }
    })
    .catch(function (error) {
        alert("Unable to connect to the Weather api");
    });

    // get city weather using the coords as the input
    var getCityWeather = function (data) {
        console.log(cityName, data);
        console.log(data[0]);
        console.log(data[0].lat, data[0].lon);
        var coordsData = data[0].state;
        console.log("Success!!!!", coordsData);
        
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" + data[0].lat + "&lon=" + data[0].lon + "&appid=" + apiKey;

        fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayCityWeather(data, coordsData);
                });
            } else {
                alert("Error: Coordinates Not Found");
            }
        })
        .catch(function (error) {
            alert("Unable to connect to the Weather api");
        });
    };
};

var displayCityWeather = function (data, coordsData) {
    console.log(data);
    cityContainerEl.classList = ("city-container");

    var cityNameDate = document.querySelector(".city-date");
    cityNameDate.textContent = data.name + " (Today's date)";

    var currentTemp = document.querySelector(".temp");
    currentTemp.textContent = "Temp: " + data.main.temp + "°F";

    var currentWind = document.querySelector(".wind");
    currentWind.textContent = "Wind: " + data.wind.speed + " MPH";

    var currentHumidity = document.querySelector(".humidity");
    currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";

    var apiUrl = "https://api.weatherbit.io/v2.0/current?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&key=" + apiKey_UV;

    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data_UV) {
                console.log(data_UV);
                var currentUV_Index = document.querySelector(".uv-index");
                currentUV_Index.textContent = "UV Index: " + data_UV.data[0].uv;
            });
        } else {
            alert("Error: Data Not Found");
        }
    })
    .catch(function (error) {
        alert("Unable to connect to the Weatherbit api");
    });
};

formInput.addEventListener("submit", formSubmitHandler);