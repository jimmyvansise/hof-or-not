'use client'
import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import trophy from '../assets/trophy.png';
import star from '../assets/star.png';
import award from '../assets/award.png';

type AccoladeOptions = 'superbowl' | 'probowl' | 'mvp';

type AccoladeIconProps = {
    accolade: AccoladeOptions;
    amount: number;
};

const AccoladeIcon: React.FC<AccoladeIconProps> = ({
    accolade,
    amount,
}) => {
    let imgSrc;
    let amountDescription;

    if (accolade === 'superbowl') {
        imgSrc = trophy;
        amountDescription = "Champ";
    } else if (accolade === 'probowl') {
        imgSrc = star;
        amountDescription = "Pro Bowl";
    }
    else { // 'mvp'
        imgSrc = award;
        amountDescription = "MVP";
    } 

    return (
        <div>
            <Image src={imgSrc} alt="Accolade Image" className="h-8 w-8 mx-auto" />
            
            <div className={clsx(`bg-hof-gold text-hof-dark-blue text-center font-alfa text-xs p-1 mt-1 rounded-md`)}>
                <div>{amount}x</div>
                <div>{amountDescription}</div>
            </div>
        </div>
    );
}

export default AccoladeIcon;