var historyIdCounter = 0;

var formInput = document.querySelector("#user-form");
var cityInput = document.querySelector("#city-input");
var cityHistoryEl = document.querySelector(".city-search-history");
var cityWeatherEl = document.querySelector(".city-weather");
var cityForecastEl = document.querySelector(".forecast-container");
const apiKey = "2ce974ae126aef3e2b73d8d71731bb9d";
const apiKey_UV = "642f411ae74d41aab68e27e199707737";
var cityContainerEl = document.querySelector(".city-container");

// create array to hold the history
var citySearchHistory = [];

var cityButtonHandler = function (event) {
  console.log(event.path[0].innerText);
  var cityName = event.path[0].innerText;

  getCityWeatherCoords(cityName);
};

var formSubmitHandler = function (event) {
  event.preventDefault();

  // get value from input
  var city = cityInput.value.trim();
  if (city === "") {
    alert("You must enter a city name!");
    return;
  }
  console.log(city);
  cityInput.value = "";

  displayCityButton(city);
};

var displayCityButton = function (cityName) {
    var cityHistory = document.createElement("button");
    cityHistory.className = "city-search";
    cityHistory.textContent = cityName;
    cityHistoryEl.appendChild(cityHistory);

    cityName.id = historyIdCounter;
    citySearchHistory.push(cityName);
    saveCityHistory();

    historyIdCounter++;

    getCityWeatherCoords(cityName);
};

var displayCityButtonHistory = function (cityName) {
  var cityHistory = document.createElement("button");
  cityHistory.className = "city-search";
  cityHistory.textContent = cityName;
  cityHistoryEl.appendChild(cityHistory);

  cityName.id = historyIdCounter;
  citySearchHistory.push(cityName);
  saveCityHistory();

  historyIdCounter++;
};

var getCityWeatherCoords = function (cityName) {
  // get city coords by using the city name as the input
  var apiUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=5&appid=" +
    apiKey;

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

    var apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" +
      data[0].lat +
      "&lon=" +
      data[0].lon +
      "&appid=" +
      apiKey;

    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayCurrentCityWeather(data);
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

var displayCurrentCityWeather = function (data) {
  console.log(data);
  cityContainerEl.classList = "city-container";

  var cityNameDate = document.querySelector(".city-date");
  cityNameDate.textContent = data.name + " - (" + moment().format("L") + ") ";

  if (data.weather[0].main === "Clouds") {
    var cityNameDateIcon = document.createElement("i");
    cityNameDateIcon.classList = "fa-solid fa-cloud";
    cityNameDate.append(cityNameDateIcon);
  } else if (data.weather[0].main === "Mist") {
    var cityNameDateIcon = document.createElement("i");
    cityNameDateIcon.classList = "fa-solid fa-cloud-rain";
    cityNameDate.append(cityNameDateIcon);
  } else if (data.weather[0].main === "Clear") {
    var cityNameDateIcon = document.createElement("i");
    cityNameDateIcon.classList = "fa-solid fa-sun";
    cityNameDate.append(cityNameDateIcon);
  } else if (data.weather[0].main === "Thunderstorm") {
    var cityNameDateIcon = document.createElement("i");
    cityNameDateIcon.classList = "fa-solid fa-cloud-bolt";
    cityNameDate.append(cityNameDateIcon);
  } else if (
    data.weather[0].main === "Rain" &&
    data.weather[0].description === "heavy intensity rain"
  ) {
    var cityNameDateIcon = document.createElement("i");
    cityNameDateIcon.classList = "fa-solid fa-cloud-showers-heavy";
    cityNameDate.append(cityNameDateIcon);
  } else if (data.weather[0].main === "Rain") {
    var cityNameDateIcon = document.createElement("i");
    cityNameDateIcon.classList = "fa-solid fa-cloud-rain";
    cityNameDate.append(cityNameDateIcon);
  } else if (data.weather[0].main === "Snow") {
    var cityNameDateIcon = document.createElement("i");
    cityNameDateIcon.classList = "fa-solid fa-snowflake";
    cityNameDate.append(cityNameDateIcon);
  } else if (data.weather[0].main === "Smoke") {
    var cityNameDateIcon = document.createElement("i");
    cityNameDateIcon.classList = "fa-solid fa-smog";
    cityNameDate.append(cityNameDateIcon);
  } else {
    cityNameDate.textContent = data.name + " - (" + moment().format("L") + ") ";
  }

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
          var currentUV_IndexValue = document.querySelector(".uv-index-value");
          currentUV_Index.textContent = "UV Index: ";
          currentUV_IndexValue.textContent = data_UV.data[0].uv;

          if (data_UV.data[0].uv < 3) {
            currentUV_IndexValue.classList =
              "uv-index-value uv-index-value-low";
          } else if (data_UV.data[0].uv >= 3 && data_UV.data[0].uv < 6) {
            currentUV_IndexValue.classList =
              "uv-index-value uv-index-value-moderate";
          } else if (data_UV.data[0].uv >= 6 && data_UV.data[0].uv < 8) {
            currentUV_IndexValue.classList =
              "uv-index-value uv-index-value-high";
          } else if (data_UV.data[0].uv >= 8 && data_UV.data[0].uv < 11) {
            currentUV_IndexValue.classList =
              "uv-index-value uv-index-value-very-high";
          } else if (data_UV.data[0].uv >= 11) {
            currentUV_IndexValue.classList =
              "uv-index-value uv-index-value-extreme";
          } else {
            currentUV_IndexValue.textContent = "Unknown";
          }

          getForecastWeather(data);
        });
      } else {
        alert("Error: Data Not Found");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to the Weatherbit api");
    });
};

var getForecastWeather = function (data) {
  console.log("!!!!!!!!!!!", data);
  var apiUrl ="https://api.openweathermap.org/data/3.0/onecall?units=imperial&lat=" + data.coord.lat + "&lon=" +data.coord.lon + "&exclude=current,minutely,hourly,alerts&appid=" + apiKey;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayForecastWeather(data);
        });
      } else {
        alert("Error: Coordinates Not Found");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to the Weather api");
    });
};

var displayForecastWeather = function (data) {
  // Clears any content in this container from previous searches so that new forecast cards can appear with the correct information
  cityForecastEl.innerHTML = "";

  cityForecastEl.classList = "city-forecast";

  var forecastTitle = document.querySelector(".forecast-title");
  forecastTitle.classList = "forecast-title";
  cityWeatherEl.appendChild(forecastTitle);

  for (var i = 1; i < 6; i++) {
    console.log(
      data.daily[i].temp.max,
      data.daily[i].wind_speed,
      data.daily[i].humidity
    );
    console.log(data);

    var forecastedDay = document.createElement("div");
    forecastedDay.classList = "card forecasted-day";
    forecastedDay.id = "card";
    cityForecastEl.appendChild(forecastedDay);

    var unixTimeStamp = data.daily[i].dt;
    var date = new Date(unixTimeStamp * 1000);
    var dateFormat = date.toLocaleDateString("en-US");

    var forecastDayDate = document.createElement("h4");
    forecastDayDate.classList = "forecast-day-date card-header";
    forecastDayDate.textContent = dateFormat;
    forecastedDay.appendChild(forecastDayDate);

    var forecastDayIcon = document.createElement("h5");
    forecastDayIcon.classList = "forecast-day card-body";
    forecastDayIcon.textContent = "";
    forecastDayDate.appendChild(forecastDayIcon);

    if (data.daily[i].weather[0].main === "Clouds") {
      var cityNameDateIcon = document.createElement("i");
      cityNameDateIcon.classList = "fa-solid fa-cloud icon";
      forecastDayIcon.append(cityNameDateIcon);
    } else if (data.daily[i].weather[0].main === "Mist") {
      var cityNameDateIcon = document.createElement("i");
      cityNameDateIcon.classList = "fa-solid fa-cloud-rain icon";
      forecastDayIcon.append(cityNameDateIcon);
    } else if (data.daily[i].weather[0].main === "Clear") {
      var cityNameDateIcon = document.createElement("i");
      cityNameDateIcon.classList = "fa-solid fa-sun icon";
      forecastDayIcon.append(cityNameDateIcon);
    } else if (data.daily[i].weather[0].main === "Thunderstorm") {
      var cityNameDateIcon = document.createElement("i");
      cityNameDateIcon.classList = "fa-solid fa-cloud-bolt icon";
      forecastDayIcon.append(cityNameDateIcon);
    } else if (
      data.daily[i].weather[0].main === "Rain" &&
      data.daily[i].weather[0].description === "heavy intensity rain"
    ) {
      var cityNameDateIcon = document.createElement("i");
      cityNameDateIcon.classList = "fa-solid fa-cloud-showers-heavy icon";
      forecastDayIcon.append(cityNameDateIcon);
    } else if (data.daily[i].weather[0].main === "Rain") {
      var cityNameDateIcon = document.createElement("i");
      cityNameDateIcon.classList = "fa-solid fa-cloud-rain icon";
      forecastDayIcon.append(cityNameDateIcon);
    } else if (data.daily[i].weather[0].main === "Snow") {
      var cityNameDateIcon = document.createElement("i");
      cityNameDateIcon.classList = "fa-solid fa-snowflake icon";
      forecastDayIcon.append(cityNameDateIcon);
    } else {
      forecastDayIcon.textContent = "???";
    }

    var forecastDayTemp = document.createElement("h5");
    forecastDayTemp.classList = "forecast-day card-body";
    forecastDayTemp.textContent = "Temp: " + data.daily[i].temp.max + "°F";
    forecastedDay.appendChild(forecastDayTemp);

    var forecastDayWind = document.createElement("h5");
    forecastDayWind.classList = "forecast-day card-body";
    forecastDayWind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
    forecastedDay.appendChild(forecastDayWind);

    var forecastDayHumidity = document.createElement("h5");
    forecastDayHumidity.classList = "forecast-day card-body";
    forecastDayHumidity.textContent =
      "Humidity: " + data.daily[i].humidity + "%";
    forecastedDay.appendChild(forecastDayHumidity);
  }
};

var saveCityHistory = function () {
  localStorage.setItem("city", JSON.stringify(citySearchHistory));
};

var loadTasks = function () {
  var savedCities = localStorage.getItem("city");
  // if there are no tasks, set tasks to an empty array and return out of the function
  if (!savedCities) {
    return false;
  }

  // parse into array of objects
  savedCities = JSON.parse(savedCities);

  // loop through savedCities array
  for (var i = 0; i < savedCities.length; i++) {
    // pass each task object into the 'displayCityButton()' function
    displayCityButtonHistory(savedCities[i]);
  }
};

formInput.addEventListener("submit", formSubmitHandler);

cityHistoryEl.addEventListener("click", cityButtonHandler);

loadTasks();
