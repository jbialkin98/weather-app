console.log("hello");



getWeatherData("Philadelphia");

const searchBar = document.getElementById("weather-search");
const searchButton = document.getElementById("search-submit");

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

        // max and min from forecast data
        const max_temp_f = forecastData.forecast.forecastday[0].day.maxtemp_f;
        const min_temp_f = forecastData.forecast.forecastday[0].day.mintemp_f;

        const feelsLike_f = weatherData.current.feelslike_f;
        const wind = weatherData.current.wind_mph;
        const humidity = weatherData.current.humidity;

        const weatherInfo = new weatherCard(city, region, temp_f, condition, max_temp_f, min_temp_f, feelsLike_f, wind, humidity);
        // testWeather.removeCard();
        weatherInfo.testPrint();
        weatherInfo.createCard();

        // const button = document.getElementById("remove");
        // button.addEventListener("click", () => {
        //     testWeather.removeCard();
        // })

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

// async function getWeatherForecastData(input) {
//     try {
//         const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=eabd672f7d9f490fbb7234121231511&q=${input}&aqi=no`);
//         const weatherForecastData = await response.json();
//         console.log(weatherForecastData);
//         const max_temp_f = weatherForecastData.forecast.forecastday[0].day.maxtemp_f;
//         const min_temp_f = weatherForecastData.forecast.forecastday[0].day.mintemp_f;
//         console.log(max_temp_f);
//         console.log(min_temp_f);
//         // const city = weatherData.location.name;
//         // const region = weatherData.location.region;
//         // const temp_f = weatherData.current.temp_f;
//         // const condition = weatherData.current.condition.text;
//         // const feelsLike_f = weatherData.current.feelslike_f;
//         // const wind = weatherData.current.wind_mph;
//         // const humidity = weatherData.current.humidity;
//         //
//         // const testWeather = new weatherCard(city, region, temp_f, condition, feelsLike_f, wind, humidity);
//         // // testWeather.removeCard();
//         // testWeather.testPrint();
//         // testWeather.createCard();
//         //
//         // const button = document.getElementById("remove");
//         // button.addEventListener("click", () => {
//         //     testWeather.removeCard();
//         // })
//
//     } catch (error) {
//         alert("Could not get weather data for this location. Please enter a valid city or zip code.");
//         console.log("Could not get weather data for this location: " + error);
//         getWeatherData("Philadelphia");
//     }
//
// }

class weatherCard {
    constructor(city, region, temp_f, condition, maxtemp_f, mintemp_f, feelsLike_f, wind, humidity) {
        this.city = city;
        this.region = region;
        this.temp_f = temp_f;
        this.condition = condition;
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
    }

    // removeCard() {
    //     this.weatherLocation.remove()
    //     this.weatherTempF.remove();
    //     this.weatherCondition.remove();
    //     this.weatherFeelsLikeF.remove();
    //     this.weatherWind.remove();
    //     this.weatherHumidity.remove();
    // }
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



