'use client'
import React, { MouseEventHandler } from 'react';
import clsx from 'clsx';

type YesNoButtonProps = {
    typeYes: boolean;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

const YesNoButton: React.FC<YesNoButtonProps> = ({
    typeYes,
    disabled,
    onClick,
}) => {
    let bgUrl;

    if (typeYes) {
        bgUrl = "bg-[url('../assets/approve-button.png')]";
    } else {
        bgUrl = "bg-[url('../assets/deny-button.png')]";
    }

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={clsx(`${bgUrl} bg-cover bg-center bg-no-repeat px-6 py-6`)}
        ></button>
    );
}

export default YesNoButton;