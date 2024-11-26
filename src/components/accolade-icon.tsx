'use client'
import React, { MouseEventHandler } from 'react';
import clsx from 'clsx';

type AccoladeOptions = 'superbowl' | 'probowl' | 'mvp';

type AccoladeIconProps = {
    accolade: AccoladeOptions;
    amount: number;
};

const AccoladeIcon: React.FC<AccoladeIconProps> = ({
    accolade,
    amount,
}) => {
    let bgUrl;
    let amountDescription;

    if (accolade === 'superbowl') {
        bgUrl = "bg-[url('../assets/trophy.png')]";
        amountDescription = "Champ";
    } else if (accolade === 'probowl') {
        bgUrl = "bg-[url('../assets/star.png')]";
        amountDescription = "Pro Bowl";
    }
    else { // 'mvp'
        bgUrl = "bg-[url('../assets/award.png')]";
        amountDescription = "MVP";
    } 

    return (
        <div>
            <img
                className={clsx(`${bgUrl} bg-cover mx-auto p-4`)}
            ></img>
            <div className={clsx(`bg-hof-gold text-hof-dark-blue text-center font-alfa text-xs p-1 mt-1 rounded-md`)}>
                <div>{amount}x</div>
                <div>{amountDescription}</div>
            </div>
        </div>
    );
}

export default AccoladeIcon;