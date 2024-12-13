'use client'
import React, {useEffect, useState} from 'react';
import YesNoButton from '@/app/components/yes-no-button';
import PlayerVoteResults from '../components/player-vote-results';
import { getPlayer, getPlayerNames } from '../../api/players';
import { postVote } from '../../api/votes';
import AccoladeIcon from '../components/accolade-icon';
import LinkButton from '../components/link-button';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';

// for debugging, eventually delete
/*
const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
*/

const LOAD_INDICATOR = false;

interface PlayerState {
  isLoading: boolean;
  currentPlayerIdx: number;
  data: Player | null;
  showVoteResults: false,
  voteData: VoteAndResults | null,
}

const getRandomIndex = (max: number) => Math.floor(Math.random() * max);

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

const PlayerPage: React.FC = () => {
  const router = useRouter();
  const [playerState, setPlayerState] = useState<PlayerState>({
    isLoading: true,
    currentPlayerIdx: -1,
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

  const { error, data: playerNamesData } = 
    useQuery({ queryKey: ['playerNames'], 
    queryFn: () => getPlayerNames(),
    retry: false,
    staleTime: 1 * 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
  });

  const playerNamesMap: Record<number, string> = {};

  if (error) {
    console.error(error);
  } else if (playerNamesData) {
      playerNamesData.forEach((player) => {
        playerNamesMap[player.playerId] = player.name.toLowerCase(); 
      });
      
      if (playerState.currentPlayerIdx === -1) {
        // console.log('setting idx initially');
        updatePlayerState({
          currentPlayerIdx: getRandomIndex(playerNamesData.length)
        });
      }
  }

  const goToNextPlayer = () => {
    const randomPlayerIdx = getRandomIndex(playerNamesData ? playerNamesData.length : 0);
    const playerName = playerNamesMap[randomPlayerIdx];
    router.push(`/players/${playerName}`);
  }

  const playerIds = Object.keys(playerNamesMap);

  const clickVote = async (hofChoice: boolean) => {
    updatePlayerState({ isLoading: true });
    try {
      const voteData = await postVote(Number(playerIds[playerState.currentPlayerIdx]), hofChoice);
      updatePlayerState({ isLoading: false, showVoteResults: true, voteData})
    } catch (error) {
      console.error(error);
      updatePlayerState({ isLoading: false });
    }
  }
  
  let playerIdToGet = playerState.currentPlayerIdx > -1 ? Number(playerIds[playerState.currentPlayerIdx]) : null;
  
  const pathname = usePathname();
  const playerName = pathname.split('/')[2];
  if (playerName) {
    // try and find the player by name
    const foundId = playerIds.find(playerId => playerNamesMap[Number(playerId)] === playerName.toLowerCase());
    
    if (foundId) {
      playerIdToGet = Number(foundId);
    }
  }

  const { data: player, error: playerError } = 
    useQuery({ 
      queryKey: ['player', playerIdToGet], // Conditional query key
      queryFn: () => playerIdToGet ? getPlayer(playerIdToGet) : null, // Only fetch if playerIdToGet exists
      enabled: !!playerIdToGet,
      retry: false,
      staleTime: 11 * 60 * 60 * 1000, // 11 hours
      gcTime: 12 * 60 * 60 * 1000, // 12 hours
    });

  if (playerError) {
    console.error(playerError);
  }

  useEffect(() => {
    if (player) {
      updatePlayerState({ 
        data: player,
        isLoading: false, 
      });
    }
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

export default PlayerPage;