'use client'
import React from 'react';
import Image from 'next/image';
import crownMedium from '../../assets/crown-md.png';
import crownBlue from '../../assets/crown-md-blue.png';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

type TopBarProps = {
    showText?: boolean;
};

const TopBar: React.FC<TopBarProps> = ({
  showText = true,
}) => {
  const router = useRouter();
  
  const clickCrown = () => {
    router.push(`/`);
  }

  let backgroundColor;

  if (showText) {
    backgroundColor = 'bg-hof-dark-blue';
  } else {
    backgroundColor = 'bg-hof-gold';
  }

  return (
    <header className={clsx(`${backgroundColor} border-b-4 border-hof-gold py-2 px-2`)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center w-full font-alfa">
          <a onClick={clickCrown} className='w-16'>
            <Image src={showText ? crownMedium : crownBlue} alt="Logo" className="h-8 w-8 cursor-pointer" />
          </a>
          { 
            showText ? 
            <>
              <h1 className="ml-2 text-2xl min-w-44">
                <span className='text-hof-green'>HOF</span>
                <span className='text-hof-gold'> OR</span>
                <span className='text-hof-red'> NOT</span>
              </h1>
              <div className='mr-2 text-hof-gold text-sm w-full text-right'>THE PEOPLE&apos;S VOTE FOR THE HALL OF FAME</div>
            </>
            : ''
          }
          
        </div>
        {/* Add navigation links or other elements here The People's Vote for the Hall of Fame */}
      </div>
    </header>
  );
}

export default TopBar;