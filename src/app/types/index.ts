import { SET_GEOLOCATION, SET_WEATHER_DATA } from 'app/context/constants';

export interface State {
    latitude: number,
    longitude: number,
    data: any,
}

export type Action =
    | { type: typeof SET_GEOLOCATION, latitude: number, longitude: number}
    | { type: typeof SET_WEATHER_DATA, data: any };
