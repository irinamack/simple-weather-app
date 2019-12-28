import { SET_GEOLOCATION, SET_WEATHER_DATA } from './constants';
import {  Action } from 'app/types';

export const setGeolocation = (latitude: number, longitude: number): Action =>
    ({ type: SET_GEOLOCATION,  latitude, longitude });
export const setWeatherData = (data: any): Action => ({ type: SET_WEATHER_DATA, data });
