import * as React from 'react';
import { Grid } from 'react-flexbox-grid';

import Typography from 'app/atoms/typography';

import * as styles from './header.scss';

const Header = () => (
    <div className={styles['header']}>
        <Grid>
            <div className={styles['header-content']}>
                <Typography type="h2">
                    Weather app
                </Typography>
            </div>
        </Grid>
    </div>
);

export default Header;
