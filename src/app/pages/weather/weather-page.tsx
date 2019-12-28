import React, { useState } from 'react';

import SearchingForm from 'app/pages/weather/searching-form';
import WeatherList from './weather-list';
import MapWithInfo from './map-with-info';
import { useGlobalState } from 'app/context/use-global-state';
import { apiKey, baseUrl, mapApiKey } from 'app/config';
import { useFetch } from 'app/hooks/use-fetch';
import { setGeolocation } from 'app/context/global-state-actions';
import WeatherCard from 'app/components/weather-card';

import * as styles from './weather-page.scss';

const WeatherPage = () => {
    const [globalState, dispatch] = useGlobalState();
    const { longitude, latitude, data } = globalState;
    const getUrl = (lat: number, lon: number) => `${baseUrl}data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKey}`;
    const { err, inProgress, setUrl } = useFetch(getUrl(latitude, longitude));
    const [message, setMessage] = useState(null);

    const onSaveCity = (id: number) => {
        let cityArr;
        const cityStorage = localStorage.getItem('cityStorage');
        const cityStorageArr = JSON.parse(cityStorage);

        if (!cityStorage) {
            cityArr = [id];

            return localStorage.setItem('cityStorage', JSON.stringify(cityArr));
        }

        if (cityStorageArr.includes(id)) {
            setMessage('City already in the list.');

            return setInterval(() => setMessage(null), 5000);
        }

        if (cityStorageArr.length >= 20) {
            setMessage('Can only save a maximum of 20 cities. Please remove from your currently saved cities to add new ones.');

            return setInterval(() => setMessage(null), 5000);
        }

        if (!cityStorageArr.includes(id)) {
            cityArr = cityStorageArr.push(id); // Add to array
            localStorage.setItem('cityStorage', JSON.stringify(cityStorageArr)); // Stringify and save to local storage
        }

        setMessage('City added successfully.');

        return setInterval(() => setMessage(null), 5000);
    };

    const onMapClick = (event: any) => {
        const {
            latLng: {
                lat,
                lng,
            },
        } = event;
        dispatch(setGeolocation(lat(), lng()));
        setUrl(getUrl(lat(), lng()));
    };

    if (!data && inProgress && !err) { return <div>Loading...</div>; }
    if (!data) { return null; }

    return (
        <div className={styles['weather-page']}>
            <SearchingForm />
            <WeatherCard
                btnText="save"
                onClick={onSaveCity}
                message={message}
                data={data}
            />
            <MapWithInfo
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${mapApiKey}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                latLng={{ lat: latitude, lng: longitude }}
                onMapClick={onMapClick}
                weatherData={data}
            />
            <WeatherList />
        </div>
    );
};

export default WeatherPage;
