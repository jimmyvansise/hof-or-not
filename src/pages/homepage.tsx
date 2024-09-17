'use client'
import React from 'react';
import Button from '../components/button';

const blueClick = () => {
    console.log('BLUE');
}

  const redClick = () => {
    console.log('RED');
  }

  const greenClick = () => {
    console.log('GREEN');
  }

const HomePage: React.FC = () => {
    return (
        <>
            <span className="text-red-800">Get started by editing BURGERS</span>
            <Button text="Hall Of Fame" color='blue' onClick={blueClick}></Button>
            <Button text="None" color='red' onClick={redClick}></Button>
            <Button text="Whaaaaa" color='green' onClick={greenClick}></Button>
        </>
    );
}

export default HomePage;