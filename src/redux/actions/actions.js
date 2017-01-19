import * as actionTypes from '../actionTypes';

export const getWeather = (coordsArr) => {
    return {
        type: actionTypes.GET_WEATHER_INITIATE,
        coordsArr: coordsArr
    }
};