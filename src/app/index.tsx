import '@babel/polyfill';

import React from 'react';
import { Grid } from 'react-flexbox-grid';

import Header from 'app/components/header';
import WeatherPage from 'app/pages/weather';
import { GlobalStateProvider } from 'app/context/use-global-state';

import * as styles from './index.scss';

const Index = () => (
    <GlobalStateProvider>
        <div className={styles['app']}>
            <Header/>
            <div className={styles['content']}>
                <Grid>
                    <WeatherPage/>
                </Grid>
            </div>
        </div>
    </GlobalStateProvider>
);

export default Index;
