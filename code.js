console.log("hello");



getWeatherData("Philadelphia");

const searchBar = document.getElementById("weather-search");
const searchButton = document.getElementById("search-submit");
const body = document.getElementById("body");

async function getWeatherData(input) {
    try {
        // get current weather conditions
        const currentResponse = await fetch(`http://api.weatherapi.com/v1/current.json?key=eabd672f7d9f490fbb7234121231511&q=${input}&aqi=no`);
        const weatherData = await currentResponse.json();
        console.log(weatherData);
        // get forecast conditions
        const forecastResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=eabd672f7d9f490fbb7234121231511&q=${input}&aqi=no`);
        const forecastData = await forecastResponse.json();
        console.log(forecastData);

        const city = weatherData.location.name;
        const region = weatherData.location.region;
        const temp_f = weatherData.current.temp_f;
        const condition = weatherData.current.condition.text;
        // get the condition image
        const conditionImage = weatherData.current.condition.icon;
        // the path to the condition image starts at index 21
        const conditionImagePath = conditionImage.slice(21);

        // max and min from forecast data
        const max_temp_f = forecastData.forecast.forecastday[0].day.maxtemp_f;
        const min_temp_f = forecastData.forecast.forecastday[0].day.mintemp_f;

        const feelsLike_f = weatherData.current.feelslike_f;
        const wind = weatherData.current.wind_mph;
        const humidity = weatherData.current.humidity;

        const weatherInfo = new weatherCard(city, region, temp_f, condition, conditionImagePath, max_temp_f, min_temp_f, feelsLike_f, wind, humidity);
        weatherInfo.testPrint();
        weatherInfo.createCard();

    } catch (error) {
        alert("Could not get weather data for this location. Please enter a valid city or zip code.");
        console.log("Could not get weather data for this location: " + error);
        getWeatherData("Philadelphia");
    }

}

function removeElementsAndRerun() {
    removeElements();
    const location = searchBar.value;
    getWeatherData(location);
}

searchButton.addEventListener("click", () => {
    removeElementsAndRerun();
});

searchBar.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        removeElementsAndRerun();
    }
});

class weatherCard {
    constructor(city, region, temp_f, condition, conditionImage, maxtemp_f, mintemp_f, feelsLike_f, wind, humidity) {
        this.city = city;
        this.region = region;
        this.temp_f = temp_f;
        this.condition = condition;
        this.conditionImage = conditionImage;
        this.maxtemp_f = maxtemp_f;
        this.mintemp_f = mintemp_f;
        this.feelsLike_f = feelsLike_f;
        this.wind = wind;
        this.humidity = humidity;

        // location
        this.weatherInfo = document.getElementById("weather-info");
        this.weatherLocation = document.createElement('h1');
        this.weatherLocation.id = "weather-location";
        // temperature in fahrenheit
        this.weatherTempF = document.createElement('h1');
        this.weatherTempF.id = "weather-temp-f";
        // weather condition
        this.weatherCondition = document.createElement('h2');
        this.weatherCondition.classList.add("weather-items");
        this.weatherCondition.id = "weather-condition";
        // condition image
        this.weatherConditionImage = document.createElement('img');
        this.weatherConditionImage.id = "weather-condition-image";
        // max temp in fahrenheit
        this.weatherMaxTempF = document.createElement('h3');
        this.weatherMaxTempF.classList.add("weather-items");
        this.weatherMaxTempF.id = "weather-max-temp-f";
        // min temp in fahrenheit
        this.weatherMinTempF = document.createElement('h3');
        this.weatherMinTempF.classList.add("weather-items");
        this.weatherMinTempF.id = "weather-min-temp-f";
        // feels like in fahrenheit
        this.weatherFeelsLikeF = document.createElement('h3');
        this.weatherFeelsLikeF.classList.add("weather-items");
        this.weatherFeelsLikeF.id = "weather-feels-like-f";
        // wind speed
        this.weatherWind = document.createElement('h3');
        this.weatherWind.classList.add("weather-items");
        this.weatherWind.id = "weather-wind";
        // humidity
        this.weatherHumidity = document.createElement('h3');
        this.weatherHumidity.classList.add("weather-items");
        this.weatherHumidity.id = "weather-humidity";
    }

    testPrint() {
        console.log("City: " + this.city);
        console.log("Region: " + this.region);
        console.log("Temp: " + this.temp_f);
        console.log("Condition: " + this.condition);
        console.log("Max Temp F: " + this.maxtemp_f);
        console.log("Min Temp F: " + this.mintemp_f);
        console.log("Feels like: " + this.feelsLike_f);
        console.log("Wind: " + this.wind);
        console.log("Humidity: " + this.humidity);
    }

    createCard() {
        this.weatherLocation.textContent = this.city + ", " + this.region;
        this.weatherInfo.appendChild(this.weatherLocation);

        // temp, condition, and image div
        const mainInfo = document.createElement('div');
        mainInfo.id = "main-weather-info";
        this.weatherInfo.appendChild(mainInfo);

        const mainInfoLeft = document.createElement('div');
        mainInfoLeft.id = "main-info-left";
        mainInfo.appendChild(mainInfoLeft);

        const mainInfoRight = document.createElement('div');
        mainInfoRight.id = "main-info-right";
        mainInfo.appendChild(mainInfoRight);

        this.weatherTempF.textContent = this.temp_f + "\u00B0F";
        mainInfoLeft.appendChild(this.weatherTempF);
        this.weatherCondition.textContent = this.condition;
        mainInfoLeft.appendChild(this.weatherCondition);
        this.weatherConditionImage.src = this.conditionImage;
        mainInfoRight.appendChild(this.weatherConditionImage);

        this.weatherMaxTempF.textContent = "High: " + this.maxtemp_f + "\u00B0F";
        this.weatherInfo.appendChild(this.weatherMaxTempF);
        this.weatherMinTempF.textContent = "Low: " + this.mintemp_f + "\u00B0F";
        this.weatherInfo.appendChild(this.weatherMinTempF);

        // const weatherFeelsLikeF = document.createElement('h1');
        this.weatherFeelsLikeF.textContent = "Feels like " + this.feelsLike_f + "\u00B0F";
        this.weatherInfo.appendChild(this.weatherFeelsLikeF);
        // const weatherWind = document.createElement('h1');
        this.weatherWind.textContent = "Wind: " + this.wind + " mph";
        this.weatherInfo.appendChild(this.weatherWind);
        // const weatherHumidity = document.createElement('h1');
        this.weatherHumidity.textContent = "Humidity: " + this.humidity + "%";
        this.weatherInfo.appendChild(this.weatherHumidity);

        console.log(this.conditionImage);

        if (this.conditionImage.charAt(14) === "n" && !body.classList.contains("night")) {
            body.classList.add("night");
            searchBar.classList.add("night");
            searchButton.classList.add("night");
        } else if (!(this.conditionImage.charAt(14) === "n") && body.classList.contains("night")) {
            body.classList.remove("night");
            searchBar.classList.remove("night");
            searchButton.classList.remove("night");
        }
    }
}

function removeElements() {
    document.getElementById("weather-location").remove();

    document.getElementById("main-weather-info").remove();

    // document.getElementById("weather-temp-f").remove();
    // document.getElementById("weather-condition").remove();
    // document.getElementById("weather-condition-image").remove();

    document.getElementById("weather-max-temp-f").remove();
    document.getElementById("weather-min-temp-f").remove();
    document.getElementById("weather-feels-like-f").remove();
    document.getElementById("weather-wind").remove();
    document.getElementById("weather-humidity").remove();
}



