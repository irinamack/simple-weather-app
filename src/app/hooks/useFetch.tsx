import { useEffect, useState } from 'react';

const useFetch = () => {
    const [data, setData] = useState(null);
    const [err, setError] = useState(null);
    const [inProgress, setInProgress] = useState(false);
    const [url, setUrl] = useState();
    const [lat, setLatitude] = useState(null);
    const [lon, setLongitude] = useState(null);

    useEffect(() => {
        if (!url) { return; }
        setInProgress(true);
        setData(null);
        setError(null);
        fetch(url)
            .then(r => {
                return r.json();
            })
            .then((weather: any) => {
                setInProgress(false);
                if (weather.cod >= 400) {
                    setError(weather.message);

                    return;
                }
                setData(weather);
                setLatitude(weather.coord.lat);
                setLongitude(weather.coord.lon);
            })
            .catch((error: any) => {
                setInProgress(false);
                setError(error);
            });
    }, [url]);

    return { data, lat, lon, err, inProgress, setUrl };
};

export default useFetch;
