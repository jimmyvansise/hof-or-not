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

  const updatePlayerState = (updates: object) => {
    setPlayerState((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const redClick = () => {
    updatePlayerState({ currentPlayerIdx: getNextIdx(playerState.currentPlayerIdx) });
  }
  
  const greenClick = () => {
    updatePlayerState({ currentPlayerIdx: getNextIdx(playerState.currentPlayerIdx) });
  }

  const fetchData = useCallback(async () => {
    updatePlayerState({ isLoading: true });

    try {
      console.log('grabbing player at idx', playerState.currentPlayerIdx);
      let player = null;
      if (process.env.NEXT_PUBLIC_UI_TEST_ONLY === 'true') {
        console.log('ui test only is on');
        player = {
          firstName: "Michael",
          id: 7,
          lastName: "Irvin", 
          nickname: "Playmaker", 
          yearRetired: 2000
        };
      }
      else {
        player = await getPlayer(randomPlayers[playerState.currentPlayerIdx]);
      }

      updatePlayerState({ data: player });
    } catch (error) {
      console.error('Error fetching player data:', error);
    } finally {
      updatePlayerState({ isLoading: false });
    }
  }, [playerState.currentPlayerIdx]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
      <div className='flex flex-col items-center pt-4'>
        <div className='w-full h-72 border-2 border-black bg-hof-gold'>
          <div>
            { playerState.isLoading ? <span>Loading...</span> 
            : 
            <div className='flex flex-col '>
              <span className="text-hof-dark-blue font-alfa text-lg">{playerState.data?.firstName.toUpperCase()} {playerState.data?.lastName.toUpperCase()}</span>
              <span className="text-red-800 font-montserrat text-lg">{playerState.data ? formatNickname(playerState.data.nickname) : ''} </span>
              <span className="text-red-800 font-montserrat text-lg">Year Retired: {playerState.data?.yearRetired} </span>
            </div> 
            }
          </div>
        </div>
        
        <div className='pt-5 w-full flex items-center justify-center'>
          <div className='pr-5'>
            <Button text="HOF" color='green' onClick={greenClick} />
          </div>
          <div className='pl-5'>
            <Button text="NOT" color='red' onClick={redClick} />
          </div>
        </div>
      </div>
  );
}

export default HomePage;