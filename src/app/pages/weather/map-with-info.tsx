import * as React from 'react';
import { compose } from 'recompose';

import Typography from 'app/atoms/typography';

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} from 'react-google-maps';

interface Latitude {
    lat: number;
    lng: number;
}

interface Props {
    googleMapURL: string;
    loadingElement: React.ReactElement;
    containerElement: React.ReactElement;
    mapElement: React.ReactElement;
    latLng: Latitude;
    onMapClick: (event: any) => void;
    weatherData: any;
}

const MapWithInfo = ((props: Props) => {
    const [isOpen, onToggleOpen] = React.useState(false);
    const toggleOpen = () => {
        onToggleOpen(!isOpen);
    };

    return (
        <GoogleMap
            defaultZoom={6}
            defaultCenter={props.latLng}
            onClick={props.onMapClick}
        >
            <Marker position={props.latLng} onClick={toggleOpen}>
                {isOpen && (
                    <InfoWindow onCloseClick={toggleOpen}>
                        <div>
                            {props.weatherData && (
                                <div>
                                    <Typography color="secondary">Location: {props.weatherData.name}</Typography>
                                    <Typography color="secondary">
                                        Temperature: {props.weatherData.main.temp}
                                        °C
                                    </Typography>
                                </div>
                            )}
                        </div>
                    </InfoWindow>
                )}
            </Marker>
        </GoogleMap>
    );
});

export default compose<Props, Props>(
    withScriptjs,
    withGoogleMap,
)(MapWithInfo);
