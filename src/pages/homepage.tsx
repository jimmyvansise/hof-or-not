'use client'
import React, {useEffect, useCallback, useState} from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Player | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const player = await getPlayer(4);

      setData(player);
    } catch (error) {
      console.error('Error fetching player data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
      <>
        <div>
          { isLoading ? <span>Loading...</span> 
          : 
          <div>
            <span className="text-red-800">Firstname: {data?.firstName} </span>
            <span className="text-red-800">Lastname: {data?.lastName} </span>
            <span className="text-red-800">Nickname: {data?.nickname} </span>
            <span className="text-red-800">Year Retired: {data?.yearRetired} </span>
          </div> 
          }
        </div>
        <Button text="Hall Of Fame" color='blue' onClick={blueClick}></Button>
        <Button text="None" color='red' onClick={redClick}></Button>
        <Button text="Whaaaaa" color='green' onClick={greenClick}></Button>
      </>
  );
}

export default HomePage;