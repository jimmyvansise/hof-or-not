'use client'
import React, { MouseEventHandler } from 'react';
import clsx from 'clsx';

type ColorOptions = 'green' | 'blue' | 'red';

type ButtonProps = {
    text: string;
    color: ColorOptions;
    // not sure if needed type?: 'button' | 'submit';
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<ButtonProps> = ({
    text,
    color,
    disabled,
    onClick,
}) => {
    let borderColor;
    let textColor;
    let hoverColor;

    if (color === 'green') {
        borderColor = 'border-hof-green';
        textColor = 'text-hof-green';
        hoverColor = 'hover:bg-hof-green';
    } else if (color === 'blue') {
        borderColor = 'border-blue-500';
        textColor = 'text-blue-500';
        hoverColor = 'hover:bg-blue-500';
    } else {
        borderColor = 'border-red-500';
        textColor = 'text-red-500';
        hoverColor = 'hover:bg-red-500';
    }

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={clsx(`${borderColor} ${textColor} ${hoverColor} bg-transparent border-2 px-4 py-2 rounded-md hover:text-white`)}
        >{text}</button> 
    );
}

export default Button;