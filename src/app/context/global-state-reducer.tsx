import { State, Action } from 'app/types';
import { SET_GEOLOCATION, SET_WEATHER_DATA } from './constants';

const GlobalStateReducer = (state: State, action: Action) => {
    switch (action.type) {
    case SET_GEOLOCATION:
        return {
            ...state,
            longitude: action.longitude,
            latitude: action.latitude,
        };
    case SET_WEATHER_DATA:
        return {
            ...state,
            data: action.data,
        };
    default:
        return state;
    }
};

export default GlobalStateReducer;
