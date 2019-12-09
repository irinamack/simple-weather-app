import * as React from 'react';
import { Grid } from 'react-flexbox-grid';
import Header from 'app/components/header';
import WeatherPage from 'app/pages/weather';

import * as styles from './index.scss';

const Index = () => {

    return (
        <div className={styles['app']}>
            <Header/>
            <div className={styles['content']}>
                <Grid>
                    <WeatherPage/>
                </Grid>
            </div>
        </div>
    );
};

export default Index;
