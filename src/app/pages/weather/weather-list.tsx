import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-flexbox-grid';

import WeatherCard from 'app/components/weather-card';
import { apiKey, baseUrl } from 'app/config';

const WeatherList = () => {
    const [data, setData] = useState(null);
    const [err, setError] = useState(null);
    const [inProgress, setInProgress] = useState(false);
    const getNewUrl = () => {
        const localCityStorage = localStorage.getItem('cityStorage'); // Get saved city ids from local storage
        const queryArr = localCityStorage ? JSON.parse(localCityStorage) : [];

        return  `${baseUrl}data/2.5/group?id=${queryArr.join(',')}&appid=${apiKey}&units=metric`;
    };

    const fetchData = async (url: string) => {
        try {
            const res = await fetch(url);
            const json = await res.json();
            setInProgress(false);
            if (json.cod >= 400) {
                setError(json.message);
                setData(null);

                return;
            }
            setData(json);
        } catch (error) {
            setInProgress(false);
            setError(error);
        }
    };

    useEffect(() => {
        fetchData(getNewUrl());
    }, [getNewUrl()]);

    const removeCity = (id: number) => {
        const filteredStorage = JSON.parse(
            localStorage.getItem('cityStorage'),
        ).filter((cityId: number) => cityId !== id);
        localStorage.setItem('cityStorage', JSON.stringify(filteredStorage));
        fetchData(getNewUrl());
    };

    if (!data && inProgress && !err) { return <h2>Loading...</h2>; }
    if (!data) { return null; }

    return (
        <Row>
            {data.list.map((weather: any) => (
                <Col xs={12} md={6} xl={4} key={weather.id} >
                    <WeatherCard data={weather} onClick={removeCity} btnText="Remove"/>
                </Col>
            ))}
        </Row>
    );
};

export default WeatherList;
