import * as actionTypes from '../actionTypes';
import { Observable } from 'rxjs/Observable';
import { serverPath, darkskyAPIBaseUrl } from '../constants';
import moment from 'moment';


const getWeatherParams = payload => {
    let coordsArr = payload.coordsArr;
    let url = serverPath + darkskyAPIBaseUrl + coordsArr[0]+'/'+coordsArr[1];

    return {
        method: "GET",
        url: url,
        async: true,
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        },
    }
};

// Darksky provides temperatures in Farenheit, convert them to a sensible format
const convertFarToCent = res => {
    res.hourly.data.map(hour => hour.tempInC = Math.round(((hour.temperature - 32) * 5 / 9) *100) /100)
    return res
};

// convert Darksky's epoch time into hours (0 to 24)
const convertEpochToHours = res => {
    res.hourly.data.map(hour => hour.timeInHrs = moment(hour.time).hour())
    return res
};

// incomplete temperature statistics function
const buildStats = res => {
    let sumTemp = 0;
    res.hourly.data.map(hour => sumTemp += hour.tempInC)
    // let avgTemp = Math.round(((sumTemp / res.hourly.data.length) / 100 ) * 100);
    return res
};


export const getWeatherEpic = action$ => action$
    .ofType(actionTypes.GET_WEATHER_INITIATE)
    .map(payload => getWeatherParams(payload))
    .switchMap((params) =>
        Observable.ajax(params)
            .map(res => res.response)
            .map(response => convertFarToCent(response))
            .map(response => convertEpochToHours(response))
            .map(response => buildStats(response))
            .map(response => ({
                type: actionTypes.GET_WEATHER_SUCCESS,
                data: response
                })
            )
            .catch(err => Observable.of({
                type: actionTypes.GET_WEATHER_FAIL,
                payload: {
                    error: err,
                },
            }))
);
