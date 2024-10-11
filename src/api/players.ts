const baseAddress = `${process.env.NEXT_PUBLIC_API_URL}/players`;

export const getPlayer = async (playerId: number): Promise<Player> => {
    const response = await fetch(`${baseAddress}/${playerId}`);
    
    const player = await response.json();
    console.log('got data for getPlayer:', player);

    return player;
};