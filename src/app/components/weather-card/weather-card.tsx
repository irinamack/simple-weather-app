import * as React from 'react';

import Button from 'app/atoms/button';
import Typography from 'app/atoms/typography';

import * as styles from './weather-card.scss';

interface OwnProps {
    weatherData: any;
    onClick: (id: number) => any;
    btnText: string;
    message?: string;
}

type Props = OwnProps;

const WeatherCard = ({ weatherData, onClick, btnText, message }: Props) => {
    const { weather, name, main, id } = weatherData;
    const icon = weather[0].icon;
    const description = weather[0].main;
    const temperature = main.temp;

    const handleClick = () => onClick(id);

    return (
        <div className={styles['weather-card']}>
            <div className={styles['city']}>
                <Typography type="h1" color="secondary" dataTest="city-name">{name}</Typography>
            </div>
            <div className={styles['temperature']}>
                <Typography type="h2" color="secondary">{Math.round(temperature)} &#8451;</Typography>
            </div>
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
            <div className={styles['description']}>
                <Typography type="h3" color="secondary">{description}</Typography>
            </div>
            <Button design={btnText === 'Remove' ? 'secondary' : 'primary'} text={btnText} onClick={handleClick}/>
            {message && <Typography type="main" color="secondary">{message}</Typography>}
        </div>
    );
};

export default WeatherCard;
