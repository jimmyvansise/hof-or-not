'use client'
import React, { MouseEventHandler } from 'react';

type WideButtonProps = {
    text: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

const WideButton: React.FC<WideButtonProps> = ({
    text,
    onClick,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className='w-full font-alfa border-hof-gold text-hof-dark-blue hover:bg-hof-dark-blue bg-hof-gold border-2 py-2 hover:text-hof-gold'
        >{text}</button>
    );
}

export default WideButton;