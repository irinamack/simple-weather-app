import * as React from 'react';
import Select from 'react-select';

import Button from 'app/atoms/button';
import countryCodes from 'app/data/countries';

import * as styles from './searching-form.scss';

interface Option {
    label: string;
    value: string;
}

interface OwnProps {
    onSearchButtonClick: (
        e: React.BaseSyntheticEvent,
        city: string,
        country: string,
    ) => any;
    error: any;
}

type Props = OwnProps & React.HTMLProps<HTMLButtonElement> & React.HTMLAttributes<HTMLButtonElement>;

const SearchingForm = (props: Props) => {
    const { onSearchButtonClick, error } = props;
    const [city, setCity] = React.useState('');
    const [countryCode, setCountry] = React.useState('');
    const disabled = city.length < 1 || countryCode.length < 1;

    const options: Array<Option> = [];
    Object.keys(countryCodes).forEach((country: string) => options.push({ value: country, label: countryCodes[country as keyof typeof countryCodes] }));
    const selectedValue: Option = {
        value: countryCode,
        label: countryCodes[countryCode as keyof typeof countryCodes],
    };

    const onSearch = (e: any) => {
        onSearchButtonClick(e, city, countryCode);
        setCountry('');
        setCity('');
    };

    return (
        <div className={styles['searching-form']}>
            <form onSubmit={e => onSearch(e)}>
                <div className={styles['content']}>
                    <div className={styles['input']}>
                        <input
                            data-test="city-input"
                            name="city"
                            value={city}
                            placeholder="Enter city..."
                            onChange={(e: any) => {setCity(e.target.value); }}
                        />
                    </div>
                    <div className={styles['select']} data-test="country-input">
                        <Select
                            name="country"
                            options={options}
                            value={countryCode && selectedValue}
                            onChange={(selected: any) => { setCountry(selected.value); }}
                            placeholder="Select country..."
                            styles={{
                                container: base => ({
                                    ...base,
                                    fontSize: '14px',
                                }),
                            }}
                        />
                    </div>
                    <Button dataTest="search-btn" design="primary" text="Check Weather" disabled={disabled}/>
                </div>
            </form>
            {error && <div className={styles['error']}>{error}</div>}
        </div>
    );
};

export default SearchingForm;
