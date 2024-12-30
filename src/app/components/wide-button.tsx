'use client'
import React, { MouseEventHandler } from 'react';

type WideButtonProps = {
    text: string;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

const WideButton: React.FC<WideButtonProps> = ({
    text,
    onClick,
    disabled,
}) => {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className='w-full font-alfa border-hof-gold text-hof-dark-blue hover:bg-hof-dark-blue bg-hof-gold border-2 py-2 hover:text-hof-gold'
        >{text}</button>
    );
}

export default WideButton;