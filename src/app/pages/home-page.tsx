'use client'
import React from 'react';
import WideButton from '../components/wide-button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import crownLarge from '../../assets/crown-lg.png';
import { useQuery } from '@tanstack/react-query';
import { getPlayerNames } from '../../api/players';

const getRandomIdx = (max: number) => Math.floor(Math.random() * max);

const HomePage: React.FC = () => {
  const router = useRouter();

  const { error, isLoading, data: playerNamesData } = 
    useQuery({ queryKey: ['playerNames'], 
    queryFn: () => getPlayerNames(),
    retry: false,
    staleTime: 1 * 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
  });

  if (error) {
    console.error(error);
  }

  const clickStart = () => {
    if (playerNamesData) {
      const randomPlayerIdx = getRandomIdx(playerNamesData.length);

      const player = playerNamesData[randomPlayerIdx];
      router.push(`/players/${player.name.toLowerCase()}`);
    }
  }

  return (
      <div className='flex flex-col items-center'>
        <div className='w-full h-96'>
            <div className='flex flex-col h-full'>
                <div className="bg-hof-dark-blue mx-1 mb-2 h-full">
                    <div className="border-hof-gold border-x-4 flex flex-col justify-between items-center w-full h-2/3 font-alfa">
                      <Image src={crownLarge} alt="Logo" className="h-12 w-12 mt-1" />
                      <span className='text-5xl text-hof-green'>HOF</span>
                      <span className='text-2xl text-hof-gold'>OR</span>
                      <span className='text-5xl mb-1 text-hof-red'>NOT</span>
                      <div className='text-xl py-2 px-4 w-full text-center bg-hof-gold text-hof-dark-blue'>THE PEOPLE&apos;S VOTE FOR THE HALL OF FAME</div>
                    </div>
                    <div className='h-1/3 p-2 font-montserrat text-white italic'>
                        Browse your favorite players, and cast your votes! After voting, you will see the live results from the public. New features being added weekly!
                    </div>
                </div>
            </div>
        </div>
        <div className='px-16 w-96'>
          <WideButton text="START VOTING" onClick={clickStart} disabled={isLoading}/>
        </div>
      </div>
  );
}

export default HomePage;