
const baseAddress = 'http://localhost:8080/players';

export const getPlayer = async (playerId: number): Promise<Player> => {
    const response = await fetch(`${baseAddress}/${playerId}`);
    
    const player = await response.json();
    console.log('got data for getPlayer:', player);

    return player;
};