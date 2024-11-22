import React from 'react';
import Image from 'next/image';

const TopBar: React.FC = () => {
  return (
    <header className="bg-hof-dark-blue border-b-4 border-hof-gold py-2 px-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-full font-alfa">
          <Image src={require('../assets/crown-md.png')} alt="Logo" className="h-8 w-8" />
          <h1 className="ml-2 text-2xl min-w-44">
            <span className='text-hof-green'>HOF</span>
            <span className='text-hof-gold'> OR</span>
            <span className='text-hof-red'> NOT</span>
          </h1>
          <div className='mr-2 text-hof-gold text-sm w-full text-right'>THE PEOPLE&apos;S VOTE FOR THE HALL OF FAME</div>
        </div>
        {/* Add navigation links or other elements here The People's Vote for the Hall of Fame */}
      </div>
    </header>
  );
}

export default TopBar;