'use client'
import React, {useEffect, useState} from 'react';
import Button from '../components/button';
import { getPlayer } from '../api/players';

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
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myData = await getPlayer(1);

        setData(myData);
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };

    fetchData();
  }, []);
  console.log('data here', data);

  return (
      <>
          <span className="text-red-800">Get started by editing</span>
          <Button text="Hall Of Fame" color='blue' onClick={blueClick}></Button>
          <Button text="None" color='red' onClick={redClick}></Button>
          <Button text="Whaaaaa" color='green' onClick={greenClick}></Button>
      </>
  );
}

export default HomePage;