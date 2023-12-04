console.log("hello");



getWeatherData("Philadelphia");

const searchBar = document.getElementById("weather-search");
const searchButton = document.getElementById("search-submit");

async function getWeatherData(input) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=eabd672f7d9f490fbb7234121231511&q=${input}&aqi=no`);
        const weatherData = await response.json();
        console.log(weatherData);
        const city = weatherData.location.name;
        const region = weatherData.location.region;
        const temp_f = weatherData.current.temp_f;
        const condition = weatherData.current.condition.text;
        const feelsLike_f = weatherData.current.feelslike_f;
        const wind = weatherData.current.wind_mph;
        const humidity = weatherData.current.humidity;

        const testWeather = new weatherCard(city, region, temp_f, condition, feelsLike_f, wind, humidity);
        // testWeather.removeCard();
        testWeather.testPrint();
        testWeather.createCard();

        const button = document.getElementById("remove");
        button.addEventListener("click", () => {
            testWeather.removeCard();
        })

    } catch (error) {
        alert("Could not get weather data for this location. Please enter a valid city or zip code.");
        console.log("Could not get weather data for this location: " + error);
        getWeatherData("Philadelphia");
    }

}

searchButton.addEventListener("click", () => {
    removeElements();
    const location = searchBar.value;
    getWeatherData(location);
});

class weatherCard {
    constructor(city, region, temp_f, condition, feelsLike_f, wind, humidity) {
        this.city = city;
        this.region = region;
        this.temp_f = temp_f;
        this.condition = condition;
        this.feelsLike_f = feelsLike_f;
        this.wind = wind;
        this.humidity = humidity;

        this.weatherInfo = document.getElementById("weather-info");
        this.weatherLocation = document.createElement('h1');
        this.weatherLocation.id = "weather-location";
        this.weatherTempF = document.createElement('h1');
        this.weatherTempF.id = "weather-temp-f";
        this.weatherCondition = document.createElement('h1');
        this.weatherCondition.id = "weather-condition";
        this.weatherFeelsLikeF = document.createElement('h1');
        this.weatherFeelsLikeF.id = "weather-feels-like-f";
        this.weatherWind = document.createElement('h1');
        this.weatherWind.id = "weather-wind";
        this.weatherHumidity = document.createElement('h1');
        this.weatherHumidity.id = "weather-humidity";
    }



    testPrint() {
        console.log("City: " + this.city);
        console.log("Region: " + this.region);
        console.log("Temp: " + this.temp_f);
        console.log("Condition: " + this.condition);
        console.log("Feels like: " + this.feelsLike_f);
        console.log("Wind: " + this.wind);
        console.log("Humidity: " + this.humidity);
    }

    createCard() {
        // const weatherInfo = document.getElementById("weather-info");
        // const weatherLocation = document.createElement('h1');
        this.weatherLocation.textContent = this.city + ", " + this.region;
        this.weatherInfo.appendChild(this.weatherLocation);
        // const weatherTempF = document.createElement('h1');
        this.weatherTempF.textContent = this.temp_f + "\u00B0F";
        this.weatherInfo.appendChild(this.weatherTempF);
        // const weatherCondition = document.createElement('h1');
        this.weatherCondition.textContent = this.condition;
        this.weatherInfo.appendChild(this.weatherCondition);
        // const weatherFeelsLikeF = document.createElement('h1');
        this.weatherFeelsLikeF.textContent = "Feels like " + this.feelsLike_f + "\u00B0F";
        this.weatherInfo.appendChild(this.weatherFeelsLikeF);
        // const weatherWind = document.createElement('h1');
        this.weatherWind.textContent = "Wind: " + this.wind + " mph";
        this.weatherInfo.appendChild(this.weatherWind);
        // const weatherHumidity = document.createElement('h1');
        this.weatherHumidity.textContent = "Humidity: " + this.humidity + "%";
        this.weatherInfo.appendChild(this.weatherHumidity);
    }

    removeCard() {
        this.weatherLocation.remove()
        this.weatherTempF.remove();
        this.weatherCondition.remove();
        this.weatherFeelsLikeF.remove();
        this.weatherWind.remove();
        this.weatherHumidity.remove();
    }
}

function removeElements() {
    // this.weatherLocation = document.createElement('h1');
    // this.weatherLocation.id = "weather-location";
    // this.weatherTempF = document.createElement('h1');
    // this.weatherTempF.id = "weather-temp-f";
    // this.weatherCondition = document.createElement('h1');
    // this.weatherCondition.id = "weather-condition";
    // this.weatherFeelsLikeF = document.createElement('h1');
    // this.weatherFeelsLikeF.id = "weather-feels-like-f";
    // this.weatherWind = document.createElement('h1');
    // this.weatherWind.id = "weather-wind";
    // this.weatherHumidity = document.createElement('h1');
    // this.weatherHumidity.id = "weather-humidity";

    document.getElementById("weather-location").remove();
    document.getElementById("weather-temp-f").remove();
    document.getElementById("weather-condition").remove();
    document.getElementById("weather-feels-like-f").remove();
    document.getElementById("weather-wind").remove();
    document.getElementById("weather-humidity").remove();
}



