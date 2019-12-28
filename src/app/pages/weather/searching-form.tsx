import React, { useState } from 'react';
import Select, { ValueType } from 'react-select';

import Button from 'app/atoms/button';
import countryCodes from 'app/data/countries';
import { useFetch } from 'app/hooks/use-fetch';
import { apiKey, baseUrl } from 'app/config';

import * as styles from './searching-form.scss';

interface Option {
    label: string,
    value: string,
}

const SearchingForm = () => {
    const { err, setUrl } = useFetch();
    const [city, setCity] = useState('');
    const [countryCode, setCountry] = useState('');
    const disabled = city.length < 1 || countryCode.length < 1;

    const options: Array<Option> = [];
    Object.keys(countryCodes).forEach((country: string) =>
        options.push({ value: country, label: countryCodes[country as keyof typeof countryCodes] }),
    );
    const selectedValue: Option = {
        value: countryCode,
        label: countryCodes[countryCode as keyof typeof countryCodes],
    };

    const handleSearch = () => {
        setUrl(`${baseUrl}data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}&units=metric`);
        setCountry('');
        setCity('');
    };

    const handleInputChange = (e: React.BaseSyntheticEvent) => {
        setCity(e.target.value);
    };

    const handleSelectChange = (selected: ValueType<Option>) => {
        setCountry((selected as Option).value);
    };

    return (
        <div className={styles['searching-form']}>
            <div className={styles['content']}>
                <div className={styles['input']}>
                    <input
                        data-test="city-input"
                        name="city"
                        value={city}
                        placeholder="Enter city..."
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles['select']} data-test="country-input">
                    <Select
                        name="country"
                        options={options}
                        value={countryCode && selectedValue}
                        onChange={handleSelectChange}
                        placeholder="Select country..."
                        styles={{
                            container: base => ({
                                ...base,
                                fontSize: '14px',
                            }),
                        }}
                    />
                </div>
                <Button
                    dataTest="search-btn"
                    design="primary"
                    text="Check Weather"
                    disabled={disabled}
                    onClick={handleSearch}
                />
            </div>
            {err && <div className={styles['error']}>{err}</div>}
        </div>
    );
};

export default SearchingForm;
