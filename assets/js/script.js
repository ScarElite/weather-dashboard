var formInput = document.querySelector("#user-form");
var cityInput = document.querySelector("#city-input");

var formSubmitHandler = function (event) {
    event.preventDefault();

    // get value from input
    var city = cityInput.value.trim();
    console.log(city);
}

formInput.addEventListener("submit", formSubmitHandler);