var formInput = document.querySelector("#user-form");
var cityInput = document.querySelector("#city-input");
var cityHistoryEl = document.querySelector(".city-search-history")

var formSubmitHandler = function (event) {
    event.preventDefault();

    // get value from input
    var city = cityInput.value.trim();
    console.log(city);
    cityInput.value = "";
    
    displayCityButton(city);
};

var displayCityButton = function (cityName) {
    console.log("Hello")
    console.log(cityName);

    var cityHistory = document.createElement("button");
    cityHistory.className = "city-search";
    // cityHistoryEl.setAttribute("href", cityName);
    cityHistory.textContent = cityName;
    cityHistoryEl.appendChild(cityHistory);
    localStorage.setItem("city", cityName);
};

formInput.addEventListener("submit", formSubmitHandler);