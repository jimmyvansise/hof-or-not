import React from 'react';

const TopBar: React.FC = () => {
  return (
    <header className="bg-hof-dark-blue border-b border-hof-gold py-2 px-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="favicon.ico" alt="Logo" className="h-10 w-10" />
          <h1 className="ml-2 text-2xl font-bold">
            <span className='text-hof-green'>HOF</span>
            <span className='text-hof-gold'> OR</span>
            <span className='text-hof-red'> NOT</span>
          </h1>
        </div>
        {/* Add navigation links or other elements here */}
      </div>
    </header>
  );
}

export default TopBar;