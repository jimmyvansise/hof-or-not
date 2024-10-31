'use client'
import React, {useEffect, useCallback, useState} from 'react';
import Button from '../components/button';
import VoteResultsPage from './vote-results-page';
import { getPlayer } from '../api/players';
import { postVote } from '../api/votes';
import { PlayerState } from './player-state';

// for debugging, eventually delete

/*
const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
*/

// TODO: make a call that gets this number instead
const TOTAL_PLAYERS = 15;
const LOAD_INDICATOR = false;

const createUniqueRandomArray = (n: number) : number[] => {
  const numbers: number[] = [];
  const shuffledNumbers: number[] = [];

  for (let i = 1; i <= TOTAL_PLAYERS; i++) {
    numbers.push(i);
  }

  while (numbers.length > 0) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    shuffledNumbers.push(numbers[randomIndex]);
    numbers.splice(randomIndex, 1);
  }

  return shuffledNumbers.slice(0, n);
}

const getNextIdx = (curIdx: number) : number => curIdx >= TOTAL_PLAYERS - 1 ? 0 : curIdx + 1;

const randomPlayers = createUniqueRandomArray(TOTAL_PLAYERS);

const formatNickname = (nickname: string) => {
  if (nickname.length) {
    return `"${nickname}"`;
  }

  return '';
}

const formatPlayerName = (firstName: string | undefined, lastName: string | undefined) => {
  if (!firstName || !lastName) return '';

  return `${firstName.toUpperCase()} ${lastName.toUpperCase()}`;
}

const renderPlayerImage = (data?: Player | null): JSX.Element | string => {
  if (!data?.picture) {
    return '';
  }

  return (
    <img
      className="absolute top-0 left-0 w-full h-full object-contain"
      src={`data:image/jpeg;base64,${data.picture}`}
      alt="Image"
    />
  );
}

const renderPlayer = (playerState: PlayerState, 
  redClick: React.MouseEventHandler<HTMLButtonElement>, 
  greenClick: React.MouseEventHandler<HTMLButtonElement>
): JSX.Element | string => {
  return (
    <>
      <div className='w-full h-96 border-1 border-hof-gold bg-hof-gold'>
        { LOAD_INDICATOR && playerState.isLoading ? 
          <span>Loading...</span> 
          :
          <div className='flex flex-col h-full'>
            <div className='flex justify-between px-2 pt-2'>
              <div className="text-hof-dark-blue font-alfa text-lg">{formatPlayerName(playerState.data?.firstName, playerState.data?.lastName)}&nbsp;</div>
              <div className="bg-hof-dark-blue text-hof-gold font-alfa text-lg px-1">{playerState.data?.position}</div>
            </div>
            <div className="bg-hof-dark-blue mx-2 mb-2 h-full">
              <div className="relative w-full h-1/2">
                { renderPlayerImage(playerState.data) }
              </div>
              <div className='h-1/2 border-t-4 border-hof-gold text-white font-montserrat text-base flex flex-col p-2'>
                <span>Nickname: {playerState.data ? formatNickname(playerState.data.nickname) : ''} </span>
                <span>Super Bowl Wins: {playerState.data?.superBowlWins}</span>
                <span>Pro Bowls: {playerState.data?.proBowls}</span>
                <span>MVPs: {playerState.data?.mvps}</span>
                <span>Year Retired: {playerState.data?.yearRetired}</span>
              </div>
            </div>
          </div>
        }
      </div>
        
      <div className='pt-4 w-full flex items-center justify-center'>
        <div className='pr-5'>
          <Button text="HOF" color='green' onClick={greenClick} disabled={playerState.isLoading}/>
        </div>
        <div className='pl-5'>
          <Button text="NOT" color='red' onClick={redClick} disabled={playerState.isLoading}/>
        </div>
      </div>
      </>
  );
}

const renderVoteResults = (playerState: PlayerState, 
  onClickNext: React.MouseEventHandler<HTMLButtonElement>, 
): JSX.Element | string => {
  return (
    <VoteResultsPage playerName={formatPlayerName(playerState.data?.firstName, playerState.data?.lastName)} 
      hofChoice={playerState.voteData ? playerState.voteData.hofChoice : false} 
      hofYesPercent={playerState.voteData ? playerState.voteData.hofYesPercent : 0}
      onClickNext={onClickNext} />
  );
}

const HomePage: React.FC = () => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    isLoading: true,
    currentPlayerIdx: 0,
    data: null,
    showVoteResults: false,
    voteData: null,
  });

  const updatePlayerState = (updates: object) => {
    setPlayerState((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const goToNextPlayer = () => {
    updatePlayerState({ isLoading: true, showVoteResults: false, currentPlayerIdx: getNextIdx(playerState.currentPlayerIdx) });
  }

  const redClick = async () => {
    updatePlayerState({ isLoading: true });
    try {
      const voteData = await postVote(randomPlayers[playerState.currentPlayerIdx], false);
      updatePlayerState({ isLoading: false, showVoteResults: true, voteData})
      console.log('vote data red:', voteData);
    } catch (error) {
      console.error('Error voting:', error);
      updatePlayerState({ isLoading: false });
    }
  }
  
  const greenClick = async () => {
    updatePlayerState({ isLoading: true });

    try {
      const voteData = await postVote(randomPlayers[playerState.currentPlayerIdx], true);
      updatePlayerState({ isLoading: false, showVoteResults: true, voteData})
      console.log('vote data green:', voteData);
    } catch (error) {
      console.error('Error voting:', error);
      updatePlayerState({ isLoading: false });
    }
  }

  const fetchData = useCallback(async () => {
    updatePlayerState({ isLoading: true });

    try {
      console.log('grabbing player at idx', playerState.currentPlayerIdx);
      const player = await getPlayer(randomPlayers[playerState.currentPlayerIdx]);

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
        { 
          !playerState.showVoteResults ?
          renderPlayer(playerState, redClick, greenClick) :
          renderVoteResults(playerState, goToNextPlayer)
        }
      </div>
  );
}

export default HomePage;

