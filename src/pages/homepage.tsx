'use client'
import React, {useEffect, useCallback, useState} from 'react';
import Button from '../components/button';
import { getPlayer } from '../api/players';

const createUniqueRandomArray = (n: number) : number[] => {
  const numbers: number[] = [];
  const shuffledNumbers: number[] = [];

  for (let i = 1; i <= 10; i++) {
    numbers.push(i);
  }

  while (numbers.length > 0) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    shuffledNumbers.push(numbers[randomIndex]);
    numbers.splice(randomIndex, 1);
  }

  return shuffledNumbers.slice(0, n);
}

const TOTAL_PLAYERS = 10;

const getNextIdx = (curIdx: number) : number => curIdx >= TOTAL_PLAYERS - 1 ? 0 : curIdx + 1;

const randomPlayers = createUniqueRandomArray(TOTAL_PLAYERS);

const formatNickname = (nickname: string) => {
  if (nickname.length) {
    return `"${nickname}"`;
  }

  return '';
}

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPlayerIdx, setPlayerIdx] = useState(0);
  const [data, setData] = useState<Player | null>(null);

  const redClick = () => {
    console.log('RED');
    setPlayerIdx(getNextIdx(currentPlayerIdx));
  }
  
  const greenClick = () => {
    console.log('GREEN');
    setPlayerIdx(getNextIdx(currentPlayerIdx));
  }

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      console.log('hi', currentPlayerIdx);
      const player = await getPlayer(randomPlayers[currentPlayerIdx]);

      setData(player);
    } catch (error) {
      console.error('Error fetching player data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPlayerIdx]);

  useEffect(() => {
    fetchData();
  }, [currentPlayerIdx]);

  return (
      <div className='flex flex-col items-center'>
        <div className='p-10 border-2 border-black'>
          <div>
            { isLoading ? <span>Loading...</span> 
            : 
            <div className='flex flex-col'>
              <span className="text-blue-900">{data?.firstName.toUpperCase()} {data?.lastName.toUpperCase()}</span>
              <span className="text-red-800">{data ? formatNickname(data.nickname) : ''} </span>
              <span className="text-red-800">Year Retired: {data?.yearRetired} </span>
            </div> 
            }
          </div>
        </div>
        
        <div className='pt-5 w-full flex place-content-around'>
          <Button text="HOF" color='green' onClick={greenClick}></Button>
          <Button text="NO" color='red' onClick={redClick}></Button>
        </div>
      </div>
  );
}

export default HomePage;