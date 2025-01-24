'use client'
import React from 'react';
import Image from 'next/image';
import crownBlue from '../../assets/crown-md-blue.png';
import horizontalLogo from '../../assets/horizontal-logo.png';
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
        <div className="flex items-center w-full h-8">
          <a onClick={clickCrown}>
          { 
            showText ?
              <Image src={horizontalLogo} alt="Logo" className="w-32 cursor-pointer"/>
            : <Image src={crownBlue} alt="Crown" className="w-8 cursor-pointer" />
          }
          </a>
        </div>
      </div>
    </header>
  );
}

export default TopBar;