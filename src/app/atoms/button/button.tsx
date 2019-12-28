import React from 'react';
import * as classnames from 'classnames';

import * as styles from './button.scss';

interface OwnProps {
    text?: string,
    onClick?: () => any,
    type?: 'submit' | 'button',
    disabled?: boolean,
    design?: 'primary' | 'secondary',
    fullWidth?: boolean,
    dataTest?: string,
}
type Props = OwnProps & React.HTMLProps<HTMLButtonElement> & React.HTMLAttributes<HTMLButtonElement>;

const Button: React.FunctionComponent<Props> = (props: Props) => {
    const {
        disabled,
        onClick,
        type,
        design,
        text,
        fullWidth,
        dataTest,
    } = props;

    const handleClick = (event: React.SyntheticEvent) => {
        onClick && onClick();
    };

    const className = classnames(
        styles['button'],
        design && styles[design],
        disabled && styles['disabled'],
        fullWidth && styles['fullWidth'],
    );

    return (
        <button
            data-test={dataTest}
            type={type}
            className={className}
            onClick={handleClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

Button.defaultProps = {
    type: 'submit',
    fullWidth: false,
    design: 'primary',
    disabled: false,
};

export default React.memo(Button);
