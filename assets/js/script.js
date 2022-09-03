var formInput = document.querySelector("#user-form");
var cityInput = document.querySelector("#city-input");
var cityHistoryEl = document.querySelector(".city-search-history");
var cityWeatherEl = document.querySelector(".city-weather");
var cityForecastEl = document.querySelector(".city-forecast");
const apiKey = "2ce974ae126aef3e2b73d8d71731bb9d";
var cityContainerEl = document.querySelector(".city-container");

const states = [
    {
      name: "Alabama",
      abbreviation: "AL"
    },
    {
      name: "Alaska",
      abbreviation: "AK"
    },
    {
      name: "American Samoa",
      abbreviation: "AS"
    },
    {
      name: "Arizona",
      abbreviation: "AZ"
    },
    {
      name: "Arkansas",
      abbreviation: "AR"
    },
    {
      name: "California",
      abbreviation: "CA"
    },
    {
      name: "Colorado",
      abbreviation: "CO"
    },
    {
      name: "Connecticut",
      abbreviation: "CT"
    },
    {
      name: "Delaware",
      abbreviation: "DE"
    },
    {
      name: "District Of Columbia",
      abbreviation: "DC"
    },
    {
      name: "Federated States Of Micronesia",
      abbreviation: "FM"
    },
    {
      name: "Florida",
      abbreviation: "FL"
    },
    {
      name: "Georgia",
      abbreviation: "GA"
    },
    {
      name: "Guam",
      abbreviation: "GU"
    },
    {
      name: "Hawaii",
      abbreviation: "HI"
    },
    {
      name: "Idaho",
      abbreviation: "ID"
    },
    {
      name: "Illinois",
      abbreviation: "IL"
    },
    {
      name: "Indiana",
      abbreviation: "IN"
    },
    {
      name: "Iowa",
      abbreviation: "IA"
    },
    {
      name: "Kansas",
      abbreviation: "KS"
    },
    {
      name: "Kentucky",
      abbreviation: "KY"
    },
    {
      name: "Louisiana",
      abbreviation: "LA"
    },
    {
      name: "Maine",
      abbreviation: "ME"
    },
    {
      name: "Marshall Islands",
      abbreviation: "MH"
    },
    {
      name: "Maryland",
      abbreviation: "MD"
    },
    {
      name: "Massachusetts",
      abbreviation: "MA"
    },
    {
      name: "Michigan",
      abbreviation: "MI"
    },
    {
      name: "Minnesota",
      abbreviation: "MN"
    },
    {
      name: "Mississippi",
      abbreviation: "MS"
    },
    {
      name: "Missouri",
      abbreviation: "MO"
    },
    {
      name: "Montana",
      abbreviation: "MT"
    },
    {
      name: "Nebraska",
      abbreviation: "NE"
    },
    {
      name: "Nevada",
      abbreviation: "NV"
    },
    {
      name: "New Hampshire",
      abbreviation: "NH"
    },
    {
      name: "New Jersey",
      abbreviation: "NJ"
    },
    {
      name: "New Mexico",
      abbreviation: "NM"
    },
    {
      name: "New York",
      abbreviation: "NY"
    },
    {
      name: "North Carolina",
      abbreviation: "NC"
    },
    {
      name: "North Dakota",
      abbreviation: "ND"
    },
    {
      name: "Northern Mariana Islands",
      abbreviation: "MP"
    },
    {
      name: "Ohio",
      abbreviation: "OH"
    },
    {
      name: "Oklahoma",
      abbreviation: "OK"
    },
    {
      name: "Oregon",
      abbreviation: "OR"
    },
    {
      name: "Palau",
      abbreviation: "PW"
    },
    {
      name: "Pennsylvania",
      abbreviation: "PA"
    },
    {
      name: "Puerto Rico",
      abbreviation: "PR"
    },
    {
      name: "Rhode Island",
      abbreviation: "RI"
    },
    {
      name: "South Carolina",
      abbreviation: "SC"
    },
    {
      name: "South Dakota",
      abbreviation: "SD"
    },
    {
      name: "Tennessee",
      abbreviation: "TN"
    },
    {
      name: "Texas",
      abbreviation: "TX"
    },
    {
      name: "Utah",
      abbreviation: "UT"
    },
    {
      name: "Vermont",
      abbreviation: "VT"
    },
    {
      name: "Virgin Islands",
      abbreviation: "VI"
    },
    {
      name: "Virginia",
      abbreviation: "VA"
    },
    {
      name: "Washington",
      abbreviation: "WA"
    },
    {
      name: "West Virginia",
      abbreviation: "WV"
    },
    {
      name: "Wisconsin",
      abbreviation: "WI"
    },
    {
      name: "Wyoming",
      abbreviation: "WY"
    }
  ]

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

    var apiUrl = "https://data.epa.gov/efservice/getEnvirofactsUVHOURLY/CITY/" + data.name + "/STATE/" + coordsData + "/JSON"

    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            });
        } else {
            alert("Error: Data Not Found");
        }
    })
    .catch(function (error) {
        alert("Unable to connect to the EPA api");
    });

    var currentUV_Index = document.querySelector(".uv-index");
    currentUV_Index.textContent = "UV Index: " + data;
}

formInput.addEventListener("submit", formSubmitHandler);