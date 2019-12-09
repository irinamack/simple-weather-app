import * as React from 'react';
import { Row, Col } from 'react-flexbox-grid';

import useFetch from 'app/hooks/useFetch';
import WeatherCard from 'app/components/weather-card';
import { apiKey, baseUrl } from 'app/config';

const WeatherList = () => {
    const { data, err, inProgress, setUrl } = useFetch();

    const featchData = () => {
        const cityStorage = localStorage.getItem('cityStorage'); // Get saved city ids from local storage
        const queryArr = cityStorage ? JSON.parse(cityStorage) : [];

        setUrl(`${baseUrl}data/2.5/group?id=${queryArr.join(',')}&appid=${apiKey}&units=metric`);
    };

    React.useEffect(() => {
        featchData();
    });

    const removeCity = (id: number) => {
        const filteredStorage = JSON.parse(
            localStorage.getItem('cityStorage'),
        ).filter((cityId: number) => cityId !== id);
        localStorage.setItem('cityStorage', JSON.stringify(filteredStorage));

        featchData();
    };

    if (!data && inProgress && !err) { return <h2>Loading...</h2>; }
    if (!data) { return null; }
    const { list } = data;

    return (
        <Row>
            {list.map((weather: any) => (
                <Col xs={12} md={6} xl={4} key={weather.id} >
                    <WeatherCard weatherData={weather} onClick={removeCity} btnText="Remove"/>
                </Col>
            ))}
        </Row>
    );
};

export default WeatherList;
