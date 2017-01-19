import * as actionTypes from '../actionTypes';

let defaultWeatherState = {
    weatherInitiated: null,
    weatherSuccess: null,
    weatherFailed: null,
    weatherResults: {
        "lattitude": 0,
        "longitude": 0,
            "timezone": "",
            "offset": 0,
            "currently": {
                "time": 0,
                "summary": "",
                "icon": "",
                "precipIntensity": 0,
                "precipProbability": 0,
                "temperature": 0,
                "apparentTemperature": 0,
                "dewPoint": 0,
                "humidity": 0,
                "windSpeed": 0,
                "windBearing": 0,
                "cloudCover": 0,
                "pressure": 0,
                "ozone": 0
            },
        "hourly": {
            "summary": "",
            "icon": "",
            "data": [
                {
                    "time": 0,
                    "summary": "",
                    "icon": "",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 0,
                    "apparentTemperature": 0,
                    "dewPoint": 0,
                    "humidity": 0,
                    "windSpeed": 0,
                    "windBearing": 0,
                    "cloudCover": 0,
                    "pressure": 0,
                    "ozone": 0
                },
            ]
        }
    }
};


const weatherReducer = (state = defaultWeatherState, action) => {
    switch (action.type) {

        case actionTypes.GET_WEATHER_INITIATE:
            return {
                ...state,
                weatherInitiated: true,
                weatherSuccess: null
            };

        case actionTypes.GET_WEATHER_SUCCESS:
            return {
                ...state,
                weatherInitiated: false,
                weatherSuccess: true,
                weatherFailed: false,
                weatherResults: action.data
            };

        case actionTypes.GET_WEATHER_FAIL:
            return {
                ...state,
                weatherInitiated: false,
                weatherSuccess: false,
                weatherFailed: true
            };

        default:
            return state
    }
};

module.exports = {
    WEATHER: weatherReducer
};
