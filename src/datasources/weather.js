const { RESTDataSource } = require('apollo-datasource-rest');

class WeatherAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://api.openweathermap.org/data/2.5/';
    }

    weatherReducer(weather) {
        return {
            id: weather.id,
            name: weather.main
        }
    }

    async getCurrentWeather(params) {
        const response = await this.get('weather', params);
        return response.weather.map(weather => this.weatherReducer(weather));
    }
}

module.exports = WeatherAPI;