'use client'
import React, {useEffect, useCallback, useState} from 'react';
import Button from '../components/button';
import { getPlayer } from '../api/players';
import { PlayerState } from './player-state';

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
  const [playerState, setPlayerState] = useState<PlayerState>({
    isLoading: true,
    currentPlayerIdx: 0,
    data: null,
  });

  const redClick = () => {
    console.log('RED');
    setPlayerState((prevState) => ({
      ...prevState,
      currentPlayerIdx: getNextIdx(playerState.currentPlayerIdx),
    }));
  }
  
  const greenClick = () => {
    console.log('GREEN');
    setPlayerState((prevState) => ({
      ...prevState,
      currentPlayerIdx: getNextIdx(playerState.currentPlayerIdx),
    }));
  }

  const fetchData = useCallback(async () => {
    setPlayerState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    try {
      console.log('grabbing player at idx', playerState.currentPlayerIdx);
      const player = await getPlayer(randomPlayers[playerState.currentPlayerIdx]);

      setPlayerState((prevState) => ({
        ...prevState,
        data: player,
      }));
    } catch (error) {
      console.error('Error fetching player data:', error);
    } finally {
      setPlayerState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }, [playerState.currentPlayerIdx]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
      <div className='flex flex-col items-center'>
        <div className='p-10 border-2 border-black'>
          <div>
            { playerState.isLoading ? <span>Loading...</span> 
            : 
            <div className='flex flex-col'>
              <span className="text-blue-900">{playerState.data?.firstName.toUpperCase()} {playerState.data?.lastName.toUpperCase()}</span>
              <span className="text-red-800">{playerState.data ? formatNickname(playerState.data.nickname) : ''} </span>
              <span className="text-red-800">Year Retired: {playerState.data?.yearRetired} </span>
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