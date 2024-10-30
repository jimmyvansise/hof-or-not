'use client'
import React, { MouseEventHandler } from 'react';
import clsx from 'clsx';
import WideButton from '@/components/wide-button';

type VoteResultsPageProps = {
    playerName: string;
    hofYesPercent: number;
    hofChoice?: boolean;
    onClickNext?: MouseEventHandler<HTMLButtonElement>;
};

const VoteResultsPage: React.FC<VoteResultsPageProps> = ({
    playerName,
    hofYesPercent,
    hofChoice,
    onClickNext,
}) => {
    const hofTextColor = hofChoice ? 'text-hof-green' : 'text-hof-red';
    const hofBorderColor = hofChoice ? 'border-hof-green' : 'border-hof-red';

    return (
        <div className='w-full h-72 border-1 border-hof-gold bg-hof-blue'>
            <div className='flex flex-col items-center font-alfa h-full'>
                <div className='pt-2'>
                    <div className="text-hof-green text-lg">{playerName}</div>
                </div>
                <div className='flex justify-between px-2 pt-2'>
                    <div className="text-white text-lg">HOF {hofYesPercent.toFixed(0)}%</div>
                    <div className="text-white text-lg">NOT {(100 - hofYesPercent).toFixed(0)}%</div>
                </div>
                <div className='pt-2'>
                    <div className={clsx(`${hofTextColor} text-base`)}>You Voted</div>
                    <div className={clsx(`${hofTextColor} ${hofBorderColor} text-center text-xl  border-t-2`)}>{hofChoice ? 'HOF' : 'NOT'}</div>
                </div>
                <WideButton text="NEXT" onClick={onClickNext} />
            </div>
        </div>
    );
}

export default VoteResultsPage;