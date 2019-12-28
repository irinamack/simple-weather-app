import * as React from 'react';

import Button from 'app/atoms/button';
import Typography from 'app/atoms/typography';

import * as styles from './weather-card.scss';

interface OwnProps {
    onClick: (id: number) => any;
    btnText: string;
    message?: string;
    data: any;
}

type Props = OwnProps;

const WeatherCard = ({ onClick, btnText, data, message }: Props) => {
    const icon = data.weather[0].icon;
    const description = data.weather[0].main;
    const temperature = data.main.temp;

    const handleClick = () => onClick(data.id);

    return (
        <div className={styles['weather-card']}>
            <div className={styles['city']}>
                <Typography type="h1" color="secondary" dataTest="city-name">{data.name}</Typography>
            </div>
            <div>
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
