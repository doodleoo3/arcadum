import React, {FC, PropsWithChildren} from 'react';
import styles from "./Button.module.scss"

interface ButtonProps {
    onClick?: () => void
}
const Button:FC<PropsWithChildren<ButtonProps>> = ({children, onClick}) => {
    return (
        <button onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;