'use client'
import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

type RelatedPlayerIconProps = {
    picture: string;
    playerName: string;
    playerRoute: string;
    hofYesPercent: number;
};

const renderPlayerImage = (picture: string): JSX.Element | string => {
    return (
        <img 
            src={picture} 
            alt="Related Player" 
            className="absolute top-0 left-0 w-full h-full object-contain" 
        />
    );
}

const RelatedPlayerIcon: React.FC<RelatedPlayerIconProps> = ({
    picture,
    playerName,
    playerRoute,
    hofYesPercent,
}) => {
    const hofTextColor = hofYesPercent >= 50 ? 'text-hof-green' : 'text-hof-red';
    const hofPercentText = hofYesPercent >= 50 ? `${hofYesPercent}% HOF` : `${100 - hofYesPercent}% NOT`

    if (picture) {
        return (
            <Link href={`/players/${playerRoute}`} rel="noopener noreferrer">
                <div className="relative w-full h-12 border-2 border-hof-gold rounded-3xl overflow-hidden">
                    {renderPlayerImage(picture)}
                    <div 
                        className="absolute inset-y-0 left-0 bg-green-500/45"
                        style={{ width: `${hofYesPercent}%` }}
                    />
                    <div 
                        className="absolute inset-y-0 right-0 bg-red-500/45"
                        style={{ width: `${100 - hofYesPercent}%` }}
                    />
                </div>
    
                <div className='pt-1 text-center text-white font-bebas text-sm max-w-20 leading-none'>{playerName}</div>
                <div className={clsx(`${hofTextColor} bg-white text-center font-bebas text-sm px-4 rounded-md`)}>
                    <div>{hofPercentText}</div>
                </div>
            </Link>
        );
    }
    return '';
}

export default RelatedPlayerIcon;