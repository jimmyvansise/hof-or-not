'use client'
import React, {useEffect, useState} from 'react';
import YesNoButton from '@/app/components/yes-no-button';
import PlayerVoteResults from '../components/player-vote-results';
import { getPlayer } from '../../api/players';
import { postVote } from '../../api/votes';
import AccoladeIcon from '../components/accolade-icon';
import LinkButton from '../components/link-button';
import { useQuery } from '@tanstack/react-query';

// for debugging, eventually delete
/*
const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
*/

// TODO: make a call that gets this number instead
const TOTAL_PLAYERS = 100;
const LOAD_INDICATOR = false;

interface PlayerState {
  isLoading: boolean;
  currentPlayerIdx: number;
  data: Player | null;
  showVoteResults: false,
  voteData: VoteAndResults | null,
}

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

const formatRetired = (yearRetired: number) => {
  if (yearRetired) {
    return `Retired in ${yearRetired}`;
  }

  return 'Current Player';
}

const formatPlayerName = (firstName: string | undefined, lastName: string | undefined, upperCase: boolean = true) => {
  if (!firstName || !lastName) return '';

  if (upperCase) {
    return `${firstName.toUpperCase()} ${lastName.toUpperCase()}`;
  }

  return `${firstName} ${lastName}`;
}

const getHighlightsHref = (playerState: PlayerState): string => {
  return `https://www.youtube.com/results?search_query=${formatPlayerName(playerState.data?.firstName, playerState.data?.lastName, false)}+highlights`;
}

const renderPlayerImage = (data?: Player | null): JSX.Element | string => {
  if (!data?.picture) {
    return '';
  }

  return (
    <img
      className="absolute top-0 left-0 w-full h-full object-contain"
      src={data.picture}
      alt="Player Image"
    />
  );
}

const renderPlayer = (
  playerState: PlayerState,
  clickVoteTrue: React.MouseEventHandler<HTMLButtonElement>,
  clickVoteFalse: React.MouseEventHandler<HTMLButtonElement>,
): JSX.Element | string => {
  return (
    <>
      <div className='w-full h-96 bg-hof-gold'>
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
              <div className='h-1/2 border-t-4 border-hof-gold flex flex-col p-2'>
                <div className='flex justify-around'>
                  <AccoladeIcon accolade='superbowl' amount={playerState.data ? playerState.data.superBowlWins : 0} />
                  <AccoladeIcon accolade='probowl' amount={playerState.data ? playerState.data.proBowls : 0} />
                  <AccoladeIcon accolade='mvp' amount={playerState.data ? playerState.data.mvps : 0} />
                </div>
                <div className='flex justify-end pt-4'>
                  <LinkButton href={getHighlightsHref(playerState)} />
                </div>
                <div className="flex pt-3 justify-between text-white font-montserrat text-sm italic">
                  <div className='text-left'>{playerState.data ? formatNickname(playerState.data.nickname) : ''}</div>
                  <div className='text-right'>{playerState.data ? formatRetired(playerState.data.yearRetired) : ''}</div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
        
      <div className='pt-4 w-full flex items-center justify-center'>
        <div className='pr-5'>
          <YesNoButton typeYes onClick={clickVoteTrue} disabled={playerState.isLoading}/>
        </div>
        <div className='pl-5'>
          <YesNoButton typeYes={false} onClick={clickVoteFalse} disabled={playerState.isLoading}/>
        </div>
      </div>
      </>
  );
}

const renderVoteResults = (playerState: PlayerState, 
  onClickNext: React.MouseEventHandler<HTMLButtonElement>, 
): JSX.Element | string => {
  return (
    <PlayerVoteResults 
      playerName={formatPlayerName(playerState.data?.firstName, playerState.data?.lastName)}
      picture={playerState.data ? playerState.data.picture : ''}
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
    updatePlayerState({ isLoading: true, data: null, showVoteResults: false, currentPlayerIdx: getNextIdx(playerState.currentPlayerIdx) });
  }

  const clickVote = async (hofChoice: boolean) => {
    updatePlayerState({ isLoading: true });
    try {
      const voteData = await postVote(randomPlayers[playerState.currentPlayerIdx], hofChoice);
      updatePlayerState({ isLoading: false, showVoteResults: true, voteData})
    } catch (error) {
      console.error(error);
      updatePlayerState({ isLoading: false });
    }
  }

  const { error, data: player } = 
    useQuery({ queryKey: ['player', playerState.currentPlayerIdx], 
    queryFn: () => getPlayer(randomPlayers[playerState.currentPlayerIdx]),
    retry: false,
    staleTime: 11 * 60 * 60 * 1000, // 11 hours
    gcTime: 12 * 60 * 60 * 1000, // 12 hours
  });

  if (error) console.error(error);

  useEffect(() => {
    updatePlayerState({ data: player, isLoading: false });
  }, [player]);

  return (
      <div className='flex flex-col items-center pt-4'>
        { 
          !playerState.showVoteResults ?
          renderPlayer(playerState, () => clickVote(true), () => clickVote(false)) :
          renderVoteResults(playerState, goToNextPlayer)
        }
      </div>
  );
}

export default HomePage;