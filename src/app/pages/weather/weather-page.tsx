import * as React from 'react';

import SearchingForm from 'app/pages/weather/searching-form';
import WeatherCard from 'app/components/weather-card';
import WeatherList from './weather-list';
import MapWithInfo from './map-with-info';
import useFetch from 'app/hooks/useFetch';
import { apiKey, baseUrl, mapApiKey } from 'app/config';

import * as styles from './weather-page.scss';

const WeatherPage = () => {
    const [latitude, setLatitude] = React.useState(null);
    const [longitude, setLongitude] = React.useState(null);
    const { data, lat, lon, err, inProgress, setUrl } = useFetch();
    const [message, setMessage] = React.useState(null);

    React.useEffect(() => {
        if (latitude === null && longitude === null && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });
        }
        latitude && longitude && updateWeatherData();
    }, [latitude, longitude]);

    const onMapClick = (event: any) => {
        setLongitude(event.latLng.lng());
        setLatitude(event.latLng.lat());
        updateWeatherData();
    };

    const updateWeatherData =  () => {
        const apiCallURL = `${baseUrl}data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKey}`;
        setUrl(apiCallURL);
    };

    const handleSearchClick = (
        e: React.BaseSyntheticEvent,
        city: string,
        country: string,
    ) => {
        e.preventDefault();
        setUrl(`${baseUrl}data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`);
    };

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

    const getWeatherCardContent = () => {
        if (!data && inProgress && !err) { return <div className={styles['loading']}>Loading...</div>; }
        if (!data) { return null; }

        return <WeatherCard weatherData={data} onClick={onSaveCity} btnText="Save" message={message}/>;
    };

    return (
        <div className={styles['weather-page']}>
            <SearchingForm
                onSearchButtonClick={handleSearchClick}
                error={err}
            />
            {getWeatherCardContent()}
            {!!lat && !!lon && (
                <div className={styles['map-with-info']}>
                    <MapWithInfo
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${mapApiKey}&v=3.exp&libraries=geometry,drawing,places`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        latLng={{ lat, lng: lon }}
                        onMapClick={onMapClick}
                        weatherData={data}
                    />
                </div>
            )}
            <WeatherList/>
        </div>
    );
};

export default WeatherPage;
