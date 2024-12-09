'use client'
import React, { MouseEventHandler } from 'react';
import clsx from 'clsx';
import WideButton from './wide-button';
import Image, { StaticImageData } from 'next/image';
import greenSideStar from '../../assets/green-side-star.png';
import redSideX from '../../assets/red-side-x.png';

type PlayerVoteResultsProps = {
    playerName: string;
    picture: string;
    hofYesPercent: number;
    hofChoice?: boolean;
    onClickNext?: MouseEventHandler<HTMLButtonElement>;
};

const renderPlayerImage = (picture: string, sidePicture: StaticImageData, hofBorderColor: string): JSX.Element | string => {
    if (!picture.length) {
      return '';
    }
    return (
        <div className='absolute top-0 left-0 h-full w-full flex justify-around items-center'>
            <Image src={sidePicture} alt="Side Image" className="w-5" />
            <img
                className={clsx(`${hofBorderColor} border-4 h-full object-contain`)}
                src={picture}
                alt="Player Image"
            />
            <Image src={sidePicture} alt="Side Image" className="w-5" />
        </div>
    );
  }

const PlayerVoteResults: React.FC<PlayerVoteResultsProps> = ({
    playerName,
    picture,
    hofYesPercent,
    hofChoice,
    onClickNext,
}) => {
    const hofTextColor = hofChoice ? 'text-hof-green' : 'text-hof-red';
    const hofBorderColor = hofChoice ? 'border-hof-green' : 'border-hof-red';
    const sidePicture = hofChoice ? greenSideStar : redSideX;

    return (
        <>
            <div className={clsx(`${hofBorderColor} border-2 w-full h-96 bg-hof-blue mb-4 shadow-[0px_0px_8px_2px_rgba(255,255,255,0.4)]`)}>
                <div className='flex flex-col items-center font-alfa h-full'>
                    <div className='h-1/6'>
                        <div className={clsx(`${hofTextColor} text-lg pt-4`)}>{playerName}</div>
                    </div>
                    <div className='relative w-full h-2/6'>
                        { renderPlayerImage(picture, sidePicture, hofBorderColor) }
                    </div>
                    <div className='flex h-1/6 items-center text-center text-white text-sm w-60'>
                        <div className="flex flex-col justify-center h-full w-1/2 bg-hof-green">
                            <div className="w-full">HOF</div>
                            <div className="w-full">{hofYesPercent}%</div>
                        </div>
                        <div className="flex flex-col justify-center h-full w-1/2 bg-hof-red ">
                            <div className="w-full">NOT</div>
                            <div className="w-full">{(100 - hofYesPercent)}%</div>
                        </div>
                    </div>
                    <div className='h-2/6 pt-4'>
                        <div className={clsx(`${hofTextColor} text-xl`)}>You Voted</div>
                        <div className={clsx(`${hofTextColor} ${hofBorderColor} text-center text-3xl border-t-2`)}>{hofChoice ? 'HOF' : 'NOT'}</div>
                    </div>
                </div>
            </div>
            <WideButton text="NEXT" onClick={onClickNext} />
        </>
    );
}

export default PlayerVoteResults;