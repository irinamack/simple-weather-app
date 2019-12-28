import React, { createContext, useReducer } from 'react';

import { State } from 'app/types';
import GlobalStateReducer from './global-state-reducer';
import { setGeolocation } from 'app/context/global-state-actions';

const initialGlobalState: State = {
    latitude: null,
    longitude: null,
    data: null,
};
const GlobalStateContext = createContext(initialGlobalState);
const DispatchStateContext = createContext(undefined);

export const GlobalStateProvider: React.ComponentType = ({ children }) => {
    const [state, dispatch] = useReducer(
        GlobalStateReducer,
        initialGlobalState,
    );

    const { longitude, latitude } = state;

    React.useEffect(() => {
        if (latitude === null && longitude === null && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position: Position) => {
                dispatch(setGeolocation(position.coords.latitude, position.coords.longitude));
            });
        }

    }, []);

    if (!latitude && !longitude) {
        return <div>Loading...</div>;
    }

    return (
        <GlobalStateContext.Provider value={state}>
            <DispatchStateContext.Provider value={dispatch}>
                {children}
            </DispatchStateContext.Provider>
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => [
    React.useContext(GlobalStateContext),
    React.useContext(DispatchStateContext),
];
