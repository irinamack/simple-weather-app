import * as React from 'react';
import * as classnames from 'classnames';

import * as styles from './typography.scss';

interface OwnProps {
    type?: 'h1' | 'h2' | 'h3' | 'h4' | 'main' | 'small',
    color?: 'primary' | 'secondary' | 'contrast' | 'error',
    weight?: '300' | '400' | '600',
    inline?: boolean,
    children: any,
    dataTest?: string
}

type Props = OwnProps & React.HTMLProps<HTMLButtonElement> & React.HTMLAttributes<HTMLButtonElement>;

const Typography: React.FunctionComponent<Props> = React.memo<Props>((props: Props) => {
    const {
        type,
        children,
        color,
        weight,
        inline,
        dataTest,
    } = props;

    const className = classnames(
        styles['typography'],
        inline && styles['inline'],
        color && styles[`text-${color}`],
        weight && styles[`font-${weight}`],
        type && styles[`type-${type}`],
    );

    return (
        <div className={className} data-test={dataTest}>
            {children}
        </div>
    );
});

Typography.defaultProps = {
    inline: false,
    color: 'primary',
    type: 'main',
};

export default Typography;
