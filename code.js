console.log("hello");

async function getWeatherData(input) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=eabd672f7d9f490fbb7234121231511&q=${input}&aqi=no`);
        const weatherData = await response.json();
        console.log(weatherData);
        const city = weatherData.location.name;
        const condition = weatherData.current.condition.text;
        const temp_f = weatherData.current.temp_f;
        const feelsLike_f = weatherData.current.feelslike_f;
        const wind = weatherData.current.wind_mph;
        const humidity = weatherData.current.humidity;

        const testWeather = new weatherCard(city, temp_f, condition, feelsLike_f, wind, humidity);
        testWeather.testPrint();

    } catch (error) {
        console.log("Could not get weather data for this location: " + error);
    }

}

getWeatherData("London");

class weatherCard {
    constructor(city, temp_f, condition, feelsLike_f, wind, humidity) {
        this.city = city;
        this.temp_f = temp_f;
        this.condition = condition;
        this.feelsLike_f = feelsLike_f;
        this.wind = wind;
        this.humidity = humidity;
    }
    testPrint() {
        console.log("City: " + this.city);
        console.log("Temp: " + this.temp_f);
        console.log("Condition: " + this.condition);
        console.log("Feels like: " + this.feelsLike_f);
        console.log("Wind: " + this.wind);
        console.log("Humidity: " + this.humidity);
    }
}