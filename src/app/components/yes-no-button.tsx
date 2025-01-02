'use client'
import React, { MouseEventHandler } from 'react';
import clsx from 'clsx';

type YesNoButtonProps = {
    typeYes: boolean;
    selected?: boolean;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

const YesNoButton: React.FC<YesNoButtonProps> = ({
    typeYes,
    selected,
    disabled,
    onClick,
}) => {
    let bgUrl;

    if (typeYes) {
        bgUrl = "bg-[url('../assets/approve-button.png')]";
    } else {
        bgUrl = "bg-[url('../assets/deny-button.png')]";
    }

    let borderColor = 'border-transparent';

    if (selected) {
        borderColor = 'border-hof-gold';
    }

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={clsx(`${bgUrl} ${borderColor} border-2 rounded-3xl bg-cover bg-center bg-no-repeat px-6 py-6`)}
        ></button>
    );
}

export default YesNoButton;