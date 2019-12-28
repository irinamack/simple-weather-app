import { useEffect, useState } from 'react';

import { setGeolocation, setWeatherData } from 'app/context/global-state-actions';
import { useGlobalState } from 'app/context/use-global-state';

export const useFetch = (initialUrl?: string) => {
    // @ts-ignore
    const [_, dispatch] = useGlobalState();
    const [data, setData] = useState(null);
    const [err, setError] = useState(null);
    const [inProgress, setInProgress] = useState(false);
    const [url, setUrl] = useState(initialUrl);

    useEffect(() => {
        if (!url) { return; }
        const fetchData = async () => {
            setInProgress(true);
            try {
                const res = await fetch(url);
                const json = await res.json();
                setInProgress(false);
                if (json.cod >= 400) {
                    setError(json.message);
                    setData(null);

                    return;
                }
                dispatch(setWeatherData(json));
                dispatch(setGeolocation(json.coord.lat, json.coord.lon));
                setData(json);
            } catch (error) {
                setInProgress(false);
                setError(error);
            }
        };

        fetchData().then();
    }, [url]);

    return { data, err, inProgress, setUrl };
};
