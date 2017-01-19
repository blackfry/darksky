import { combineEpics } from 'redux-observable';
import {
    getWeatherEpic
} from '../epics/darksky';

export default combineEpics(
    getWeatherEpic,
);
