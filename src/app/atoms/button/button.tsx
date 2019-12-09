import * as React from 'react';
import * as classnames from 'classnames';

import * as styles from './button.scss';

interface OwnProps {
    text?: string,
    onClick?: () => any,
    type?: 'submit' | 'button',
    disabled?: boolean,
    loading?: boolean,
    design?: 'primary' | 'secondary',
    fullWidth?: boolean,
    dataTest?: string,
}
type Props = OwnProps & React.HTMLProps<HTMLButtonElement> & React.HTMLAttributes<HTMLButtonElement>;

export default class Button extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    public static defaultProps: Partial<Props> = {
        loading: false,
        type: 'submit',
        design: 'primary',
        fullWidth: false,
        disabled: false,
    };

    onClick(event: React.SyntheticEvent) {
        const {
            disabled,
            loading,
            onClick,
        } = this.props;

        if (!disabled && !loading) {
            onClick && onClick();
        }
    }

    render() {
        const {
            type,
            disabled,
            loading,
            design,
            text,
            fullWidth,
            dataTest,
        } = this.props;

        const className = classnames(
            styles['button'],
            design && styles[design],
            (disabled || loading) && styles['disabled'],
            fullWidth && styles['fullWidth'],
        );

        return (
            <button
                data-test={dataTest}
                type={type}
                className={className}
                onClick={this.onClick}
                disabled={disabled}
            >
                {text}
            </button>
        );
    }
}
