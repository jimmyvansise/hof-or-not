/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, {useEffect, useState} from 'react';
import YesNoButton from '@/app/components/yes-no-button';
import PlayerVoteResults from '../components/player-vote-results';
import { getPlayer, getPlayerNames } from '../../api/players';
import { postVote } from '../../api/votes';
import AccoladeIcon from '../components/accolade-icon';
import RelatedPlayerIcon from '../components/related-player-icon';
import LinkButton from '../components/link-button';
import WideButton from '../components/wide-button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';

// for debugging, eventually delete
/*
const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
*/

interface PlayerState {
  isLoading: boolean;
  currentPlayerId: number;
  data: PlayerWithHofChoiceRelatedPlayers | null;
  playerNamesMap: Record<number, string>;
  showVoteResults: false,
  voteData: VoteAndResults | null,
}

const getRandomPlayerId = (max: number) => Math.floor(Math.random() * max) + 1;

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

// consider using playerState.isLoading to show indicator in future
const renderPlayer = (
  playerState: PlayerState,
  clickVoteTrue: React.MouseEventHandler<HTMLButtonElement>,
  clickVoteFalse: React.MouseEventHandler<HTMLButtonElement>,
): JSX.Element => {
  return (
    <>
      <div className='w-full h-96 bg-hof-gold'>
        <div className='flex flex-col h-full'>
          <div className='flex justify-between px-2 pt-1'>
            <div className="text-hof-dark-blue font-alfa text-lg">{formatPlayerName(playerState.data?.firstName, playerState.data?.lastName)}&nbsp;</div>
            <div className="bg-hof-dark-blue text-hof-gold font-alfa text-lg px-1">{playerState.data?.position}</div>
          </div>
          <div className="bg-hof-dark-blue mx-2 mb-1 h-full">
            <div className="relative w-full h-1/2">
              { renderPlayerImage(playerState.data) }
            </div>
            <div className='h-1/2 border-t-4 border-hof-gold flex flex-col p-2'>
              <div className='flex justify-around pr-2'>
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
      </div>
        
      <div className='py-2 w-full flex items-center justify-center border-hof-gold border-x-8 border-b-8'>
        <div className='pr-5'>
          <YesNoButton typeYes 
            onClick={clickVoteTrue} 
            disabled={playerState.isLoading} 
            selected={playerState.data && playerState.data.hofChoice !== null ? playerState.data.hofChoice : false}/>
        </div>
        <div className='pl-5'>
          <YesNoButton typeYes={false} 
            onClick={clickVoteFalse} 
            disabled={playerState.isLoading}
            selected={playerState.data && playerState.data.hofChoice !== null ? !playerState.data.hofChoice : false}/>
        </div>
      </div>
    </>
  );
}

const renderVoteResults = (playerState: PlayerState): JSX.Element => {
  return (
    <PlayerVoteResults 
      playerName={formatPlayerName(playerState.data?.firstName, playerState.data?.lastName)}
      picture={playerState.data ? playerState.data.picture : ''}
      hofChoice={playerState.voteData ? playerState.voteData.hofChoice : false}
      hofYesPercent={playerState.voteData ? playerState.voteData.hofYesPercent : 0} 
    />
  );
}

const renderRelatedPlayers = (playerState: PlayerState, 
  onClickNext: React.MouseEventHandler<HTMLButtonElement>
): JSX.Element => {
  return (
    <>
      <div className='pt-1 flex flex-col w-full h-full'>
          <div className="px-2 text-hof-gold font-bebas text-2xl">Related Players</div>
          <div className='flex justify-around'>
            <div className='pr-1'>
              <RelatedPlayerIcon 
                hofYesPercent={playerState.data ? playerState.data.relatedPlayer1HofYesPercent: 0}
                playerName={formatPlayerName(playerState.data?.relatedPlayer1FirstName, playerState.data?.relatedPlayer1LastName)}
                playerRoute={playerState.data ? 
                  `${playerState.data.relatedPlayer1FirstName}${playerState.data.relatedPlayer1LastName}` 
                  : ''}
                picture={playerState.data ? playerState.data.relatedPlayer1Picture : ''}
              />
            </div>
            <div className='pr-1'>
              <RelatedPlayerIcon 
                hofYesPercent={playerState.data ? playerState.data.relatedPlayer2HofYesPercent: 0}
                playerName={formatPlayerName(playerState.data?.relatedPlayer2FirstName, playerState.data?.relatedPlayer2LastName)}
                playerRoute={playerState.data ? 
                  `${playerState.data.relatedPlayer2FirstName}${playerState.data.relatedPlayer2LastName}` 
                  : ''}
                picture={playerState.data ? playerState.data.relatedPlayer2Picture : ''}
              />
            </div>
            <RelatedPlayerIcon 
              hofYesPercent={playerState.data ? playerState.data.relatedPlayer3HofYesPercent: 0}
              playerName={formatPlayerName(playerState.data?.relatedPlayer3FirstName, playerState.data?.relatedPlayer3LastName)}
              playerRoute={playerState.data ? 
                `${playerState.data.relatedPlayer3FirstName}${playerState.data.relatedPlayer3LastName}` 
                : ''}
              picture={playerState.data ? playerState.data.relatedPlayer3Picture : ''}
            />
          </div>
      </div>
      <div className='w-72 pt-3'>
        <WideButton text="VIEW RANDOM PLAYER" onClick={onClickNext} />
      </div>
    </>
  );
}

const PlayerPage: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [playerState, setPlayerState] = useState<PlayerState>({
    isLoading: true,
    currentPlayerId: -1,
    playerNamesMap: {},
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

  if (error) {
    console.error(error);
  }

  const goToNextPlayer = () => {
    const randomPlayerId = getRandomPlayerId(playerNamesData ? playerNamesData.length : 1);
    const playerName = playerState.playerNamesMap[randomPlayerId];

    router.push(`/players/${playerName}`);
  }

  const clickVote = async (hofChoice: boolean) => {
    updatePlayerState({ isLoading: true });

    try {
      const voteData = await postVote(playerState.currentPlayerId, hofChoice);
      updatePlayerState({ isLoading: false, showVoteResults: true, voteData});

      if (playerState.data?.hofChoice !== null && 
        voteData.hofChoice !== playerState.data?.hofChoice) {
        // invalidate cache if they switch from false to true or the reverse only
        queryClient.invalidateQueries({ 
          queryKey: ['player', playerState.currentPlayerId] 
        });
      }
    } catch (error) {
      console.error(error);
      updatePlayerState({ isLoading: false });
    }
  }

  const { data: player, error: playerError } = 
    useQuery({ 
      queryKey: ['player', playerState.currentPlayerId], // Conditional query key
      queryFn: () => playerState.currentPlayerId > -1 ? getPlayer(playerState.currentPlayerId) : null, // Only fetch if playerIdToGet exists
      enabled: playerState.currentPlayerId > -1,
      retry: false,
      staleTime: 11 * 60 * 60 * 1000, // 11 hours
      gcTime: 12 * 60 * 60 * 1000, // 12 hours
    });

  if (playerError) {
    console.error(playerError);
  }

  const pathname = usePathname();
  const playerName = pathname.split('/')[2];

  useEffect(() => {
    if (playerNamesData) {
      const playerNamesMap: Record<number, string> = {};

      playerNamesData.forEach((player) => {
        playerNamesMap[player.playerId] = player.name.toLowerCase(); 
      });

      const playerIds = Object.keys(playerNamesMap);
      
      if (playerState.currentPlayerId === -1) {
        if (playerName) {
          // try and find the player by name
          const foundId = playerIds.find(playerId => playerNamesMap[Number(playerId)] === playerName.toLowerCase());
          
          if (foundId) {
            updatePlayerState({
              currentPlayerId: Number(foundId),
              playerNamesMap,
            });

            return;
          }
        }
        // random player
        updatePlayerState({
          currentPlayerId: getRandomPlayerId(playerNamesData.length),
          playerNamesMap,
        });
      }
    }
  }, [playerNamesData]);

  useEffect(() => {
    if (player) {
      updatePlayerState({
        data: player,
        isLoading: false, 
      });
    }
  }, [player]);

  return (
      <div className='flex flex-col items-center pt-3'>
        { 
          !playerState.showVoteResults ?
          renderPlayer(playerState, () => clickVote(true), () => clickVote(false)) :
          renderVoteResults(playerState)
        }
        { renderRelatedPlayers(playerState, goToNextPlayer) }
      </div>
  );
}

export default PlayerPage;